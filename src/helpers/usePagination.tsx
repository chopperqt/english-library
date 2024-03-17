interface UsePagination {
  page: number;
  amountOfPages: number;
}

export const usePagination = ({ page, amountOfPages }: UsePagination) => {
  const isLastPage = page - 1 >= amountOfPages;

  if (page < 2) {
    return {
      from: 0,
      to: 69,
    };
  }

  const to = page * 70 - 1;
  const from = to - 69;


  return {
    isLastPage,
    from,
    to,
  };
};
