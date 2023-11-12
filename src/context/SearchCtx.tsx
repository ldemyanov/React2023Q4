import { createContext, FC, useCallback, useContext, useState } from 'react';

type TSearchContext = {
  searchString: string;
  updateSearchString: (newSearchString: string) => void;
};

const SearchContext = createContext<TSearchContext>({
  searchString: '',
  updateSearchString: () => {},
});

type SearchCtxProviderProps = {
  children: React.ReactNode;
};

export const SearchCtxProvider: FC<SearchCtxProviderProps> = ({ children }) => {
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const updateSearchString = useCallback((newSearchString: string) => {
    localStorage.setItem('searchQuery', newSearchString);
    setSearchString(newSearchString);
  }, []);

  return (
    <SearchContext.Provider value={{ searchString, updateSearchString }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchCtx = () => useContext<TSearchContext>(SearchContext);
