/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  it('renders', () => {
    render(<App />);
  });
});
