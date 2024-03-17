import { Input, Spin } from "antd";
import { useSelector } from "react-redux";

import { useSearch } from "@pages/library/hooks/useSearch";
import { getSearchWords } from "@services/search/Search.store";

import { Word } from "./partials/Word";

const SEARCH_STYLES = "w-full absolute top-[45px] rounded-sm bg-white p-1";
const SEARCH_TEXT = "Search...";

const Search = () => {
  const searchWords = useSelector(getSearchWords);

  const {
    handleChangeValue,
    value,
    isLoading,
    isShowSearchedWord,
    handleClickPin,
    handleSubmitUpdate,
    handleClickDelete,
    isLoadingDelete,
    isLoadingUpdate,
  } = useSearch({
    searchWords,
  });

  const formattedPrex = isLoading ? <Spin className="flex" /> : "🔍";

  return (
    <form className="flex items-center w-full relative">
      <Input
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        placeholder={SEARCH_TEXT}
        name="search"
        size="large"
        prefix={formattedPrex}
      />
      {isShowSearchedWord && (
        <div className={SEARCH_STYLES}>
          {searchWords.map(({ pined, word, id, translate }) => (
            <Word
              wordID={id}
              onClickPin={handleClickPin}
              onSubmitUpdate={handleSubmitUpdate}
              onClickDelete={handleClickDelete}
              word={word}
              pined={pined}
              isLoadingUpdate={isLoadingUpdate}
              isLoadingDelete={isLoadingDelete}
              translate={translate}
            />
          ))}
        </div>
      )}
    </form>
  );
};

export default Search;
