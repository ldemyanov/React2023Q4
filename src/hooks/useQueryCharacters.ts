import { useEffect, useState, useCallback } from 'react';
import { getCharacters } from '../api/rickandmortyapi';
import axios from 'axios';
import { useCharachers } from '../context';

const emptyError = { isError: false, message: '' };

export const useQueryCharacters = (
  searchString: string,
  perPageElements: number,
  page: number = 1
) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ isError: boolean; message: string }>(emptyError);
  const [count, setCount] = useState<number>(0);
  const { updateCharacters, characters } = useCharachers();

  const toSearch = useCallback(async () => {
    setLoading(true);
    try {
      const check = perPageElements === 10 && page > 1;
      const queryPage = String(check ? Math.ceil(page / 2) : page);
      const { data } = await getCharacters(searchString, queryPage);
      setError(emptyError);
      setCount(data.info.count);
      updateCharacters(data.results);
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
      updateCharacters([]);
    }
    setLoading(false);
  }, [page, searchString, updateCharacters, perPageElements]);

  useEffect(() => {
    toSearch();
  }, [toSearch]);

  let items = characters;
  if (items && perPageElements === 10) {
    items = (page * perPageElements) % 20 !== 0 ? items.slice(0, 10) : items.slice(-10);
  }

  return { isLoading, error, count, characters: items };
};
