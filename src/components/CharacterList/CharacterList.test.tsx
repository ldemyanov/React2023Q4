import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CharacterList from './CharacterList';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../../mocks/server';
import SearchPageCtx from '../../pages/SearchPage/SearchPageCtx';

describe('CharacterList', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('1. CharacterList checke number cards', async () => {
    render(
      <BrowserRouter>
        <SearchPageCtx>
          <CharacterList />
        </SearchPageCtx>
      </BrowserRouter>
    );

    const countCard = await waitFor(() => {
      const cards = screen.getAllByTestId('characterCard');
      return cards.length;
    });

    expect(countCard).toBe(20);
  });

  it('1. CharacterList checke number cards', async () => {
    render(
      <BrowserRouter>
        <SearchPageCtx>
          <CharacterList />
        </SearchPageCtx>
      </BrowserRouter>
    );

    const countCard = await waitFor(() => {
      const cards = screen.getAllByTestId('characterCard');
      return cards.length;
    });

    expect(countCard).toBe(20);
  });
});
