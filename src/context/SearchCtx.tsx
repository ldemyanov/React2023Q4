import { createContext, FC, useCallback, useContext, useState } from 'react';

type TSearchContext = {
  searchString: string;
  updateSearchString: (newSearchString: string) => void;

  page: number;
  setPage: (page: number) => void;

  perPageElements: number;
  setPerPageElemetns: (page: number) => void;
};

const SearchContext = createContext<TSearchContext>({
  searchString: '',
  updateSearchString: () => {},

  page: 1,
  setPage: () => {},

  perPageElements: 20,
  setPerPageElemetns: () => {},
});

type SearchCtxProviderProps = {
  children: React.ReactNode;
  initPage?: number;
  initPerPageElements?: number;
  initSearchString?: string; // using for testing
};

export const SearchCtxProvider: FC<SearchCtxProviderProps> = ({
  children,
  initPage = 1,
  initPerPageElements = 20,
  initSearchString = '',
}) => {
  const [page, setPage] = useState<number>(initPage);
  const [perPageElements, setPerPageElemetns] = useState(initPerPageElements);

  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? initSearchString
  );

  const updateSearchString = useCallback((newSearchString: string) => {
    localStorage.setItem('searchQuery', newSearchString);
    setSearchString(newSearchString);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchString,
        updateSearchString,
        page,
        setPage,
        perPageElements,
        setPerPageElemetns,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchCtx = () => useContext<TSearchContext>(SearchContext);
