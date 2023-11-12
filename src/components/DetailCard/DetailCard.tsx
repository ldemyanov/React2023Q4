import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ICharacter, IEpisode } from '../../types';
import { getCharacter, getEpisodes } from '../../api/rickandmortyapi';
import { Loader } from '../Loader';
// import CloseSVG from '../../assets/close.svg?react';
import classes from './style.module.scss';

const DetailCard: React.FC = () => {
  const { characterId } = useParams();
  const [searchParams] = useSearchParams();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isMoreEpisodes, setMoreEpisodes] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData(id: string) {
      setLoading(true);

      const { data: resCharacter } = await getCharacter(Number(id));
      const links =
        resCharacter.episode.length > 10
          ? (setMoreEpisodes(true), resCharacter.episode.slice(0, 10))
          : resCharacter.episode;

      const responses = await getEpisodes(links);
      const episodes = responses.map((r) => r.data);

      setCharacter(resCharacter);
      setEpisodes(episodes);
      setLoading(false);
    }

    if (characterId) {
      const isNumber = /^\d+$/.test(characterId);
      if (isNumber) {
        fetchData(characterId);
      }
    }
  }, [characterId]);

  return (
    <div className={classes.detailCard} data-testid="detailCard">
      {isLoading ? (
        <div className="flex justify-center content-center mt-auto mb-auto">
          <Loader testId="DetailCardLoader" />
        </div>
      ) : !character ? (
        <div className={classes.detailCard}>
          <div className="flex justify-center content-center mt-auto mb-auto text-stone-300">
            <div>
              <h2 className={classes.title1}>This character not found</h2>
              <p className="text-center py-3 px-2">
                You are seeing this message because something went wrong, for example, you entered
                the wrong parameters into url.
              </p>
              <Link className="text-center w-full block underline" to="/">
                Continue search
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Link data-testid="closeBtn" className="ml-auto" to={`/?${searchParams.toString()}`}>
            {/* <CloseSVG className="fill-stone-400" /> */} X
          </Link>
          <h1 className={classes.title1}>{character.name}</h1>
          <img
            className={classes.image}
            src={character.image}
            alt={`Image with ${character.name}`}
          />
          <ul className={classes.propList}>
            <li>
              <span className={classes.propName}>Gender: </span>
              <span className={classes.propValue}>{character.gender}</span>
            </li>
            <li>
              <span className={classes.propName}>Species: </span>
              <span className={classes.propValue}>{character.species}</span>
            </li>
            <li>
              <span className={classes.propName}>Status: </span>
              <span className={classes.propValue}>{character.status}</span>
            </li>
            <li>
              <span className={classes.propName}>Origin: </span>
              <span className={classes.propValue}>{character.origin.name}</span>
            </li>
            <li>
              <span className={classes.propName}>Location: </span>
              <span className={classes.propValue}>{character.location.name}</span>
            </li>
          </ul>
          <h2 className={classes.title2}>Episodes: </h2>
          <ul className={classes.episodeList}>
            {episodes.map((episode) => (
              <li key={episode.id}>
                <span className={classes.episodeNum}>{episode.episode}: </span>
                <span className={classes.episodeName}>{episode.name}</span>
              </li>
            ))}
          </ul>
          {isMoreEpisodes && <p>(And in other episodes)</p>}
        </>
      )}
    </div>
  );
};

export default DetailCard;
