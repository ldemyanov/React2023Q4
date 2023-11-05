import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ICharacter, IEpisode } from '../../types';
import classes from './style.module.scss';
import { getCharacter, getEpisodes } from '../../api/rickandmortyapi';
import { Loader } from '../Loader';
import CloseSVG from '../../assets/close.svg?react';

function DetailCard() {
  const { chId } = useParams();
  const [searchParams] = useSearchParams();
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isMoreEpisodes, setMoreEpisodes] = useState<boolean>(false);
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData(id: string) {
      setLoading(true);

      const character = await getCharacter(Number(id));
      const links =
        character.episode.length > 10
          ? (setMoreEpisodes(true), character.episode.slice(0, 10))
          : character.episode;

      const res = await getEpisodes(links);

      setCharacter(character);
      setEpisodes(res);
      setLoading(false);
    }

    if (chId) fetchData(chId);
  }, [chId]);

  if (isLoading || !character) {
    return (
      <div className={classes.detailCard}>
        <div className="flex justify-center content-center mt-auto mb-auto">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={classes.detailCard}>
      <Link className="ml-auto" to={`/?${searchParams.toString()}`}>
        <CloseSVG className="fill-stone-400" />
      </Link>
      <h1 className={classes.title1}>{character.name}</h1>
      <img className={classes.image} src={character.image} alt={`Image with ${character.name}`} />
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
    </div>
  );
}

export default DetailCard;
