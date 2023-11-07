import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import commonClasses from '../../styles/common.module.scss';
import classes from './stye.module.scss';
import LeftSquareSvg from '../../assets/leftSquare.svg?react';
import RightSquareSvg from '../../assets/rightSquare.svg?react';
import { CharacterCard } from './CharacterCard';
import { getCharacters } from '../../api/rickAndMortyAPI';
import { ICharacter } from '../../types';
import { PaginationStepState } from '../SelectPagination/SelectPagination';
import { Loader } from '..';
import axios from 'axios';

const CharacterListError: React.FC<{ message: string }> = ({ message }) => (
  <div className={classes.cardList}>
    <p className={classes.message}>{message}</p>
  </div>
);

type CharacterListProps = {
  searchString: string;
  pagination: PaginationStepState;
  changePage: (page: number) => void;
};

const CharacterList: React.FC<CharacterListProps> = ({ searchString, changePage, pagination }) => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const pageNum = Number(searchParams.get('page') || 1);
  const pageStepRef = useRef<number>(pagination.option?.value || 20);

  useEffect(() => {
    async function toSearch() {
      setLoading(true);

      try {
        const check = pageStepRef.current === 10 && pageNum > 1;
        const page = check ? Math.ceil(pageNum / 2) : pageNum;
        const { data } = await getCharacters(searchString, String(page));

        setError(false);
        setCount(data.info.count);
        setCharacters(data.results);
      } catch (error) {
        setError(true);

        if (axios.isAxiosError(error)) {
          setMessage(
            error.response?.status === 404
              ? 'Not Found'
              : `Error with code ${error.response?.status}`
          );
        } else {
          setMessage('Unknown error');
        }
      }

      setLoading(false);
    }

    toSearch();
  }, [searchString, pageNum]);

  let items = characters;
  if (items) {
    if (pageStepRef.current === 10) {
      items =
        (pageNum * pageStepRef.current) % 20 !== 0
          ? characters.slice(0, 10)
          : characters.slice(-10);
    }
  }

  return isLoading ? (
    <div className={commonClasses.loaderContainer}>
      <Loader />
    </div>
  ) : (
    <div className={classes.cardContainer}>
      {!error && characters.length ? (
        <>
          <div className={classes.cardList}>
            {items.map((character, index) => (
              <CharacterCard key={index} character={character} />
            ))}
          </div>
          <div className="flex justify-center text-slate-100 my-5">
            <button
              className={pageNum > 1 ? 'mx-2 fill-stone-500' : 'mx-2 invisible'}
              onClick={() => changePage(pageNum - 1)}
            >
              <LeftSquareSvg />
            </button>
            <span className="mx-2 text-stone-200">{pageNum}</span>
            <button
              className={
                pageNum <= count / pageStepRef.current ? 'mx-2 fill-stone-500' : 'mx-2 invisible'
              }
              onClick={() => changePage(pageNum + 1)}
            >
              <RightSquareSvg />
            </button>
          </div>
        </>
      ) : (
        <CharacterListError message={message} />
      )}
    </div>
  );
};

export default CharacterList;
