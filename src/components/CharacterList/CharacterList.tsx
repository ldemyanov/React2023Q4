import React, { useEffect, useState } from 'react';
import commonClasses from '../../styles/common.module.scss';
import classes from './stye.module.scss';
import LeftSquareSvg from '../../assets/leftSquare.svg?react';
import RightSquareSvg from '../../assets/rightSquare.svg?react';
import { CharacterCard } from './CharacterCard';
import { useSearchParams } from 'react-router-dom';
import { NetworkError } from '../../errors';
import { getCharacters } from '../../api/rickandmortyapi';
import { Loader } from '../Loader';
import { ICharacter } from '../../types';

type CharacterListProps = {
  searchString: string;
  customStep: number;
  changePage: (page: number) => void;
};

// const memoizedGetCharacters = () => {
//   const cash = new Map<string, Promise<TCharactersResult>>();
//   return (query: string, page: string) => {
//     const cashName = query + '&' + page;

//     if (cash.has(cashName)) {
//       return cash.get(cashName) as Promise<TCharactersResult>;
//     }

//     const result = getCharacters(query, page);
//     cash.set(cashName, result);
//     return result;
//   };
// };

// const getCharactersWithMemo = memoizedGetCharacters();

function CharacterList({ searchString, changePage }: CharacterListProps) {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(20);
  const [searchParams] = useSearchParams();
  const pageNum = Number(searchParams.get('page') ?? 1);
  const stepPagination = 20; // Ограничение API

  useEffect(() => {
    const page = Number(searchParams.get('page') || 1);

    async function toSearch() {
      setLoading(true);
      try {
        const res = await getCharacters(searchString, String(page));

        setCount(res.info.count);
        setCharacters(res.results);
        setError(false);
      } catch (error: unknown) {
        let message = 'Unknown Error';
        if (error instanceof NetworkError) {
          message = error.status === 404 ? 'Not found' : error.message;
        }

        setCount(0);
        setCharacters([]);
        setError(true);
        setMessage(message);
      }
      setLoading(false);
    }

    toSearch();
  }, [searchString, searchParams]);

  const toLeft = () => {
    if (pageNum > 1) {
      changePage(pageNum - 1);
    }
  };

  const toRight = () => {
    if (pageNum <= count / stepPagination) {
      changePage(pageNum + 1);
    }
  };

  if (isLoading) {
    <div className={commonClasses.loaderContainer}>
      <Loader />
    </div>;
  }

  if (!error && characters.length) {
    return (
      <div className="flex flex-col" style={{ width: '960px' }}>
        <div className={classes.cardList}>
          {characters.map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
        </div>

        <div className="flex justify-center text-slate-100 my-5">
          <button
            className={pageNum > 1 ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
            onClick={toLeft}
          >
            <LeftSquareSvg />
          </button>
          <span className="mx-2 text-stone-200">{pageNum}</span>
          <button
            className={
              pageNum <= count / stepPagination
                ? 'mx-2 fill-stone-500'
                : 'mx-2 invisible'
            }
            onClick={toRight}
          >
            <RightSquareSvg />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.cardList}>
      <p className={classes.message}>{message}</p>
    </div>
  );
}

export default CharacterList;
