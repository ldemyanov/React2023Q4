import { useEffect, useState, useCallback } from 'react';
import { usePersonsDispatch } from '../context/CharactersCtx';
import { getCharacters } from '../api/rickandmortyapi';
import axios from 'axios';

const emptyError = { isError: false, message: '' };

export const useQueryCharacters = (searchString: string, page: number = 1) => {
  const setCharacters = usePersonsDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>(emptyError);
  const [count, setCount] = useState<number>(0);

  const toSearch = useCallback(async () => {
    try {
      const check = page === 10 && page > 1;
      const { data } = await getCharacters(
        searchString,
        String(check ? Math.ceil(page / 2) : page)
      );
      setError(emptyError);
      setCount(data.info.count);
      setCharacters(data.results);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.status === 404
            ? 'Not Found'
            : `Error with code ${error.response?.status}`;
        setError({ isError: true, message });
      } else {
        setError({ isError: true, message: 'Unknown error' });
      }
    }
  }, [page, searchString, setCharacters]);

  useEffect(() => {
    setLoading(true);
    toSearch();
    setLoading(false);
  }, [toSearch]);

  return { isLoading, error, count };
};
