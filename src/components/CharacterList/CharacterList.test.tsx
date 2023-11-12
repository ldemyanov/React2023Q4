import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import CharacterList from './CharacterList';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../../mocks/server';
import { CharactersProvider, SearchCtxProvider } from '../../context';

describe('1. CharacterList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('1.1.1 CharacterList check 20 (default value) cards', async () => {
    render(
      <BrowserRouter>
        <SearchCtxProvider>
          <CharactersProvider>
            <CharacterList />
          </CharactersProvider>
        </SearchCtxProvider>
      </BrowserRouter>
    );
    const countCard = await waitFor(() => {
      const cards = screen.getAllByTestId('characterCard');
      return cards.length;
    });
    expect(countCard).toBe(20);
  });

  it('1.1.2 CharacterList check 10 cards', async () => {
    render(
      <BrowserRouter>
        <SearchCtxProvider initPerPageElements={10}>
          <CharactersProvider>
            <CharacterList />
          </CharactersProvider>
        </SearchCtxProvider>
      </BrowserRouter>
    );
    const countCard = await waitFor(() => {
      const cards = screen.getAllByTestId('characterCard');
      return cards.length;
    });
    expect(countCard).toBe(10);
  });

  it('1.2 Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <BrowserRouter>
        <SearchCtxProvider initSearchString="noCharacters">
          <CharactersProvider>
            <CharacterList />
          </CharactersProvider>
        </SearchCtxProvider>
      </BrowserRouter>
    );
    const countCard = await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
      const cards = screen.queryAllByTestId('characterCard');
      return cards.length;
    });
    expect(countCard).toBe(0);
  });
});
