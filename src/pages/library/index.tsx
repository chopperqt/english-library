import { Spin } from "antd";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { throttle } from "lodash-es";

import { libraryApiInjection } from "@api/library.api";

import ErrorContent from "./partials/ErrorContent";
import EmptyContent from "./components/empty/EmptyContent";
import Words from "./components/words";
import {
  CommonProvider,
  useCommon,
} from "../../context/common.context";

// const Search = lazy(() => import("./components/search"));
// const CreateWord = lazy(() => import("./components/createWord/CreateWord"));
// const PinedWords = lazy(() => import("./components/pined-words"));

// const BUTTON_TEXT = "More...";

export interface Props {
  api: ReturnType<typeof createApi>;
}

const Library = ({ api }: Props) => {
  const [layoutWidth, setLayoutWidth] = useState(0)

  const layoutRef = useRef<HTMLDivElement | null>(null)

  const { useGetWordsQuery } = libraryApiInjection(api);

  const {
    isError,
    isFetching,
    data: words,
  } = useGetWordsQuery({ page: 1 });

  const hasWords = useMemo(() => {
    return !!words?.data.length
  }, [words])

  const handleResize = throttle((entries: ResizeObserverEntry[]) => {
    const elementWidth = entries[0].contentRect.width

    setLayoutWidth(elementWidth)
  }, 500)

  const resizeObserver = new ResizeObserver(handleResize)

  useEffect(() => {
    if (!layoutRef.current) {
      return
    }

    resizeObserver.observe(layoutRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [layoutRef.current, hasWords])

  if (isFetching || !words?.data) {
    return <Spin />
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (!hasWords) {
    return <EmptyContent />;
  }

  console.log('layoutWidth: ', layoutWidth)

  return (
    <div
      ref={layoutRef}
      className="flex flex-col p-5 gap-5"
    >
      <div className="flex gap-3 p-[15px] rounded-lg bg-slate-100">
        <Words words={words?.data} />
      </div>
    </div>
  );
};

export default Library;

// <Suspense fallback={null}>
// <Search />
// </Suspense>
// {!isLastPage && (
//   <div className="w-full h-[100px] flex items-center justify-center">
//     <Button
//       onClick={handleGetMoreWords}
//       loading={isLoading}
//       size="large"
//       type="primary"
//       className="flex items-center"
//     >
//       {BUTTON_TEXT}
//     </Button>
//   </div>
// )}
// 
// <Suspense fallback={<Skeleton height={40} width={61} />}>
//   <CreateWord />
// </Suspense>
// <Suspense fallback={null}>
//   <PinedWords />
// </Suspense>
//
//<Words />
//
// <Suspense fallback={<Skeleton height={40} />}>
// <Search />
// </Suspense>
