import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Router from '../../Router';

describe('Search', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route.', () => {
    render(
      <MemoryRouter initialEntries={['/undefined/undefined']}>
        <Router />
      </MemoryRouter>
    );

    expect(screen.getByText('Page 404')).not.toBeNull();
  });
});
