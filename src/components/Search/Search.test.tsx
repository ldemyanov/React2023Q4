import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';
import { BrowserRouter } from 'react-router-dom';
import { SearchCtxProvider } from '../../context';

const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
  },
});

describe('Search', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', () => {
    render(
      <BrowserRouter>
        <SearchCtxProvider>
          <Search />
        </SearchCtxProvider>
      </BrowserRouter>
    );

    const input = document.querySelector('input[name="searchString"]');
    expect(input).not.toBeNull();

    if (input) {
      fireEvent.change(input, {
        target: {
          value: 'Rick',
        },
      });
    }

    const btnSearch = screen.getByTestId('btnStartSearch');
    fireEvent.click(btnSearch);
    expect(mockSetItem).toHaveBeenCalled();
  });

  it('Check that the component retrieves the value from the local storage upon mounting', () => {
    render(
      <BrowserRouter>
        <SearchCtxProvider>
          <Search />
        </SearchCtxProvider>
      </BrowserRouter>
    );

    expect(mockGetItem).toHaveBeenCalled();
  });
});
