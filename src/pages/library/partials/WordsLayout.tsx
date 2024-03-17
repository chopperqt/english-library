interface WordsLayoutProps {
  children: (JSX.Element | null) | (JSX.Element | null)[];
  className?: string
}

export const WordsLayout = ({ children, className }: WordsLayoutProps) => {
  return (
    <div className={`columns-1 sm:columns-1 md:columns-2 lg:columns-2 xl:columns-3 2xl:columns-4 list-none ${className}`}>
      {children}
    </div>
  );
};
