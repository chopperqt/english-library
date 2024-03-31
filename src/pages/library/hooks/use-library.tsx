import { createApi } from "@reduxjs/toolkit/query/react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ParamsController } from "@helpers/paramsController";
import { libraryApiInjection } from "@api/library.api";
import { throttle } from "lodash-es";

interface Props {
  api: ReturnType<typeof createApi>;
}

const useLibrary = ({ api }: Props) => {
  const {
    setParam,
    getParam,
  } = ParamsController();

  const layoutRef = useRef<HTMLDivElement | null>(null)


  const pageParam = getParam("page");
  const currentPage = pageParam ? +pageParam : 1;

  const { useGetWordsQuery } = libraryApiInjection(api);

  const [layoutWidth, setLayoutWidth] = useState(0)

  const {
    isError,
    isFetching,
    isLoading,
    data,
  } = useGetWordsQuery({ page: currentPage });

  const handleResize = throttle((entries: ResizeObserverEntry[]) => {
    const elementWidth = entries[0].contentRect.width

    setLayoutWidth(elementWidth)
  }, 500)

  const resizeObserver = new ResizeObserver(handleResize)

  const hasWords = useMemo(() => {
    return !!data?.data.length
  }, [data])

  useEffect(() => {
    if (!layoutRef.current) {
      return
    }

    resizeObserver.observe(layoutRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [layoutRef.current, hasWords])

  const handleLoadMoreWords = () => {
    const nextPage = currentPage + 1;

    setParam("page", nextPage.toString());
  };

  return {
    words: data?.data || [],
    amountOfWords: data?.count || 0,
    isError,
    isFetching,
    layoutWidth,
    isLoading,
    layoutRef,
    hasWords,
    handleLoadMoreWords,
  };
};

export default useLibrary;
