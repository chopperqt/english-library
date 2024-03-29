import React, { lazy, Suspense, useMemo } from "react";
import { createApi } from "@reduxjs/toolkit/query/react";

import Skeleton from "@components/Skeleton";

import EmptyContent from "./components/empty/EmptyContent";
import Words from "./components/words";
import ErrorContent from "./partials/ErrorContent";
import { libraryApiInjection } from "@api/library.api";

const Search = lazy(() => import("./components/search"));
const CreateWord = lazy(() => import("./components/createWord/CreateWord"));
const PinedWords = lazy(() => import("./components/pined-words"));

// const BUTTON_TEXT = "More...";

export interface Props {
  api: ReturnType<typeof createApi>;
}

const Library = ({ api }: Props) => {
  const { useGetWordsQuery } = libraryApiInjection(api);

  const {
    isError,
    data: words,
  } = useGetWordsQuery({ page: 1 });


  // const { isLastPage, handleGetMoreWords } = useLibrary({
  //   isLoading,
  // });

  const hasWords = useMemo(() => {
    return !!words?.data.length
  }, [words])

  console.log('hasWords: ', hasWords)

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
          <Suspense fallback={<Skeleton height={40} />}>
            <Search />
          </Suspense>
          <Suspense fallback={<Skeleton height={40} width={61} />}>
            <CreateWord />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <PinedWords />
        </Suspense>
        <Words />
      </div>
    </React.Fragment>
  );
};

export default Library;

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
