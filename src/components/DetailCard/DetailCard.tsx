import React from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Loader } from '../Loader';
// import CloseSVG from '../../assets/close.svg?react';
import classes from './style.module.scss';
import { useFetchCharacterQuery, useFetchEpisodeQuery } from '../../services/RickAndMortyService';

const Episode: React.FC<{ link: string }> = ({ link }) => {
  const { data } = useFetchEpisodeQuery({ link });

  return (
    data && (
      <li key={data.id}>
        <span className={classes.episodeNum}>{data.episode}: </span>
        <span className={classes.episodeName}>{data.name}</span>
      </li>
    )
  );
};

const DetailCard: React.FC = () => {
  const { characterId } = useParams();
  const [searchParams] = useSearchParams();

  const { isError, isLoading, data } = useFetchCharacterQuery(characterId || 1000);
  const character = data;
  const links = data?.episode || [];

  return (
    <div className={classes.detailCard} data-testid="detailCard">
      {isLoading ? (
        <div className="flex justify-center content-center mt-auto mb-auto">
          <Loader testId="DetailCardLoader" />
        </div>
      ) : isError ? (
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
        character && (
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
              {character &&
                character.episode.slice(0, 10).map((link) => <Episode key={link} link={link} />)}
            </ul>
            {links.length > 10 && <p>(And in other episodes)</p>}
          </>
        )
      )}
    </div>
  );
};

export default DetailCard;
