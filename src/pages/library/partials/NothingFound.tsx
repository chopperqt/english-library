const NOTHING_FOUND_TEXT = 'Sorry, nothing found! 😔'

const NothingFound = () => {
  return (
    <div className="p-3 bg-white rounded-md text-xl shadow-md">
      {NOTHING_FOUND_TEXT}
    </div>
  );
}

export default NothingFound;