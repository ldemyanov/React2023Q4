import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { server } from '../../mocks/server';
import App from '../../components/App/App';
import * as API from '../../services/RickAndMortyService';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import { CharacterList } from '../../components';

describe('Tests for the Detailed Card and Card components:', () => {
  beforeEach(async () => {
    server.listen();

    await act(async () =>
      render(
        <Provider store={setupStore()}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Detail Cards', () => {
    it('Validate that clicking on a card makes api call and opens a detailed card component', async () => {
      const mockGetCharacters = jest.spyOn(API, 'useFetchCharacterQuery');

      const firstCard = await waitFor(() => {
        const cards = screen.getAllByTestId('characterCard');
        return cards[0];
      });
      await user.click(firstCard);
      await expect(mockGetCharacters).toHaveBeenCalled();
      await waitFor(() => {
        screen.getByTestId('detailCard');
      });
    });

    it('Ensure that clicking the close button hides the component.', async () => {
      const firstCard = await waitFor(() => {
        const cards = screen.getAllByTestId('characterCard');
        return cards[0];
      });
      await user.click(firstCard);
      await waitFor(() => {
        screen.getByTestId('detailCard');
      });

      const closeBtn = screen.getByTestId('closeBtn');
      await user.click(closeBtn);
      await waitFor(() => {
        const item = screen.queryByTestId('detailCard');
        expect(item).toBeNull();
      });
    });

    it('Make sure the detailed card component correctly displays the detailed card data', async () => {
      const firstCard = await waitFor(() => {
        const cards = screen.getAllByTestId('characterCard');
        return cards[0];
      });
      await user.click(firstCard);
      expect(screen.getByText('Alive')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Earth (C-137)')).toBeInTheDocument();
      expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument();
    });
  });
});

describe('Check that a loading indicator is displayed while fetching data', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    );
    const message = screen.getByTestId('testLoader');
    expect(message).toBeInTheDocument();
  });
});
