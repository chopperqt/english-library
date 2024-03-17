import React, {
  lazy,
  Suspense
} from "react";
import { Button } from "antd";

import Skeleton from "@components/Skeleton";

import EmptyContent from "./components/empty/EmptyContent";
import useLibrary from "./hooks/useLibrary";
import Words from "./components/words";
import ErrorContent from "./partials/ErrorContent";

const Search = lazy(() => import("./components/search"));
const CreateWord = lazy(() => import("./components/createWord/CreateWord"));
const PinedWords = lazy(() => import("./components/pined-words"));

const BUTTON_TEXT = "More...";

export interface LibraryProps {
  initialPage: number;
}

const Library = () => {
  // const words = useSelector(getWords);
  const words: any[] = []
  const userID = window.localStorage.getItem('userId') || '';
  // const isFetched = useSelector(getLoading).getLibraryWords?.isFetched;
  const isFetched = false
  // const isError = useSelector(getLoading).getLibraryWords?.isError;
  // const isLoading = useSelector(getLoading).getLibraryWords?.isLoading;
  // const isLoadingMoreWords =
  //   useSelector(getLoading).getLibraryWordsByPagination?.isLoading;
  const hasWords = !!words.length;
  const isError = false
  const isLoading = false
  const isLoadingMoreWords = false


  const {
    isLastPage,
    handleGetMoreWords,
  } = useLibrary({
    userID,
    words,
    isFetched,
    isLoading,
  });

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
          <Suspense
            fallback={
              <Skeleton height={40} />
            }
          >
            <Search />
          </Suspense>
          <Suspense
            fallback={
              <Skeleton
                height={40}
                width={61}
              />
            }
          >
            <CreateWord />
          </Suspense>
        </div>
        <Suspense fallback={null}>
          <PinedWords />
        </Suspense>
        <Words />
      </div>
      {!isLastPage && (
        <div className="w-full h-[100px] flex items-center justify-center">
          <Button
            onClick={handleGetMoreWords}
            loading={isLoadingMoreWords}
            size="large"
            type="primary"
            className="flex items-center"
          >
            {BUTTON_TEXT}
          </Button>
        </div>
      )}
    </React.Fragment>
  );
};

export default Library;
