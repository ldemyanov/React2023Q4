import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CharacterList from './CharacterList';
import { BrowserRouter } from 'react-router-dom';
import { server } from '../../mocks/server';
import { Provider } from 'react-redux';
import { setupStore } from '../../store/store';
import App from '../App/App';

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

  it('CharacterList check 20 (default value) cards', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <CharacterList />
        </BrowserRouter>
      </Provider>
    );
    const countCard = await waitFor(() => {
      const cards = screen.getAllByTestId('characterCard');
      return cards.length;
    });
    expect(countCard).toBe(20);
  });

  it('Check that an appropriate message is displayed if no cards are present.', async () => {
    render(
      <Provider store={setupStore()}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const input = document.querySelector('input[name="searchString"]');
      if (input) {
        fireEvent.change(input, {
          target: {
            value: 'noCharacters',
          },
        });
      }

      const btnSearch = screen.getByTestId('btnStartSearch');
      fireEvent.click(btnSearch);
    });

    const countCard = await waitFor(() => {
      expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
      const cards = screen.queryAllByTestId('characterCard');
      console.log(cards);
      return cards.length;
    });
    expect(countCard).toBe(0);
  });
});
