import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App/App';
import { server } from '../../../mocks/server';

describe('Tests for the Detailed Card and Card components:', () => {
  beforeEach(async () => {
    server.listen();

    await act(async () =>
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      )
    );
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Pagination', () => {
    it('Make sure the component updates URL query parameter when page changes.', async () => {
      const getPageParams = () => {
        const searchParams = new URLSearchParams(window.location.search);
        const index = searchParams.get('page');
        return Number(index) || -1;
      };

      await waitFor(() => {
        const btn = screen.getByTestId('rigth');
        fireEvent.click(btn);
        expect(getPageParams()).toBe(2);
      });
    });
  });
});
