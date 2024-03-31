import { Button, Spin } from "antd";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import { createApi } from "@reduxjs/toolkit/query/react";
import { throttle } from "lodash-es";

import ErrorContent from "./partials/ErrorContent";
import EmptyContent from "./components/empty/EmptyContent";
import Words from "./components/words";
import useLibrary from "./hooks/use-library";

import styles from './Library.module.scss'

// const BUTTON_TEXT = "More...";

export interface Props {
  api: ReturnType<typeof createApi>;
}

const Library = ({ api }: Props) => {
  const {
    layoutWidth,
    amountOfWords,
    hasWords,
    isError,
    isFetching,
    isLoading,
    layoutRef,
    words,
    handleLoadMoreWords,
  } = useLibrary({
    api,
  })

  if (isLoading || !hasWords) {
    return <Spin />
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (!hasWords) {
    return <EmptyContent />;
  }

  return (
    <div
      ref={layoutRef}
      className="flex flex-col p-5 gap-5"
    >
      <div className={styles.content}>
        <Words
          words={words}
          amountOfWords={amountOfWords}
          layoutWidth={layoutWidth}
        />
        <div>
          <Button
            type="primary"
            loading={isFetching}
            onClick={handleLoadMoreWords}
          >
            Загрузить еще
          </Button>
        </div>
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
