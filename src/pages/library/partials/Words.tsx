const Words = () => (
  <div className="flex flex-col items-start gap-3 flex-wrap">
    {/* {!!wordsPined.length && (
      <React.Fragment>
        <div className="flex items-center">
          <div className="text-2xl font-bold">{wordsPinedTitle}</div>
          <ResetPin />
        </div>
        <div className="flex justify-start items-start gap-3 flex-wrap">
          {Object.entries(normalizedPinedWords).map(
            ([key, words]: [key: string, words: any]) => {
              const amountOfWords = words.length;

              if (!amountOfWords) {
                return null;
              }

              return (
                <WordsContainer
                  key={key}
                  userID={userID}
                  letter={key}
                  amountOfWords={amountOfWords}
                  words={words}
                  color="bg-indigo-700"
                />
              );
            }
          )}
        </div>
      </React.Fragment>
    )} */}
  </div>
);

export default Words;
