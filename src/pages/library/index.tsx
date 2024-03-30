import React, { useMemo } from "react";
import { Spin } from "antd";
import { createApi } from "@reduxjs/toolkit/query/react";

// import Skeleton from "@components/Skeleton";

import { libraryApiInjection } from "@api/library.api";

import ErrorContent from "./partials/ErrorContent";
import EmptyContent from "./components/empty/EmptyContent";
import Words from "./components/words";
// import Words from "./components/words";

// const Search = lazy(() => import("./components/search"));
// const CreateWord = lazy(() => import("./components/createWord/CreateWord"));
// const PinedWords = lazy(() => import("./components/pined-words"));

// const BUTTON_TEXT = "More...";

export interface Props {
  api: ReturnType<typeof createApi>;
}

const Library = ({ api }: Props) => {
  const { useGetWordsQuery } = libraryApiInjection(api);

  const {
    isError,
    isFetching,
    data: words,
  } = useGetWordsQuery({ page: 1 });

  const hasWords = useMemo(() => {
    return !!words?.data.length
  }, [words])

  if (isFetching || !words?.data) {
    return <Spin />
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (!hasWords) {
    return <EmptyContent />;
  }

  return (
    <React.Fragment>
      <div className="flex flex-col p-5 gap-5">
        <div className="flex gap-3 p-[15px] rounded-lg bg-slate-100">
          <Words words={words?.data} />
        </div>
      </div>
    </React.Fragment>
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
