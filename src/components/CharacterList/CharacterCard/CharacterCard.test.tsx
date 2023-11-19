import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { ICharacter } from '../../../types';
import { BrowserRouter } from 'react-router-dom';

const mockCharacter: ICharacter = {
  id: 1,
  name: 'Test Rick Sanchez 2',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
  location: {
    name: 'Citadel of Ricks',
    url: 'https://rickandmortyapi.com/api/location/3',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
};

describe('2. CharacterCard', () => {
  it('2.1 Ensure that the card component renders the relevant card data;', async () => {
    render(
      <BrowserRouter>
        <CharacterCard character={mockCharacter} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Test Rick Sanchez 2/i)).toBeInTheDocument();
  });
});
