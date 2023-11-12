import { createContext, FC, useCallback, useContext, useState } from 'react';

type TSearchCtx = string;
type TDispatchSearchCtx = (newSearchString: string) => void;

const SearchCtx = createContext<TSearchCtx>('');
const DispatchSearchCtx = createContext<TDispatchSearchCtx | null>(null);

type SearchCtxProviderProps = {
  childrens: React.ReactNode;
};

export const SearchCtxProvider: FC<SearchCtxProviderProps> = ({ childrens }) => {
  const [searchString, setSearchString] = useState<string>(
    localStorage.getItem('searchQuery') ?? ''
  );

  const updateSearchString = useCallback((newSearchString: string) => {
    localStorage.setItem('searchQuery', newSearchString);
    setSearchString(newSearchString);
  }, []);

  return (
    <SearchCtx.Provider value={searchString}>
      <DispatchSearchCtx.Provider value={updateSearchString}>
        {childrens}
      </DispatchSearchCtx.Provider>
    </SearchCtx.Provider>
  );
};

export const useSearchDispatch = () => {
  const setSearchString = useContext(DispatchSearchCtx);

  if (!setSearchString) {
    throw new Error('useSearchDispatch has to be used within <SearchSetStateContext.Provider>');
  }

  return setSearchString;
};

export const useSearchCtx = () => useContext<TSearchCtx>(SearchCtx);
