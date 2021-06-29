/**
 * @jest-environment jsdom
 */

import { render, RenderResult } from '@testing-library/react';

import Input from './Input';

describe('Input', () => {
  const value = '';
  const fieldName = '할 일';
  const buttonName = '추가';

  const handleChange = jest.fn();
  const handleClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderInput = (): RenderResult => render((
    <Input
      value={value}
      fieldName={fieldName}
      buttonName={buttonName}
      handleChange={handleChange}
      handleClick={handleClick}
    />
  ));

  it('renders input control', () => {
    const { getByRole } = renderInput();

    expect(getByRole('textbox', { name: fieldName })).toBeInTheDocument();
  });

  it('renders button', () => {
    const { getByRole } = renderInput();

    expect(getByRole('button', { name: buttonName })).toBeInTheDocument();
  });
});
