import React, { useEffect, useState } from 'react';
import { ICharacter, IEpisode } from '../../types';
import classes from './style.module.scss';
import { getEpisodes } from '../../api/rickandmortyapi';
import { Loader } from '../Loader';

type DetailCardProps = {
  character: ICharacter;
};

function DetailCard({ character }: DetailCardProps) {
  const [episodes, setEpisodes] = useState<IEpisode[]>([]);
  const [isMoreEpisodes, setMoreEpisodes] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchEpisodes(links: string[]) {
      setLoading(true);
      const firstLinks =
        links.length > 10 ? (setMoreEpisodes(true), links.slice(0, 10)) : links;
      const res = await getEpisodes(firstLinks);
      setEpisodes(res);
      setLoading(false);
    }

    fetchEpisodes(character.episode);
  }, [character]);

  console.log(episodes);

  if (isLoading) {
    return (
      <div className={classes.detailCard}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={classes.detailCard}>
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
    </div>
  );
}

export default DetailCard;
