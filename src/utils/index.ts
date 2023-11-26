import { FgetMatch } from '../types';

export const getEndNumberFromLink: FgetMatch = (link) => {
  const result = link.match(/\d*$/g);
  return result ? result[0] : null;
};
