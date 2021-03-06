/**
 * @jest-environment jsdom
 */

import { fireEvent, render } from '@testing-library/react';

import TitleField from './TitleField';

describe('Input', () => {
  const handleFocus = jest.fn();
  const handleChange = jest.fn();
  const handleClick = jest.fn();
  const handleKeyDown = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderTitleField = () => (
    render((
      <TitleField
        value=""
        fieldName="할 일"
        handleFocus={handleFocus}
        handleChange={handleChange}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
      />
    ))
  );

  it('renders input control listening focus, type, and keyPress  event', () => {
    const { getByRole } = renderTitleField();

    const inputControl = getByRole('textbox', { lable: '할 일' });

    inputControl.focus();

    expect(handleFocus).toBeCalled();

    fireEvent.change(inputControl, { target: { value: '123' } });

    expect(handleChange).toBeCalled();

    fireEvent.keyDown(inputControl, { key: 'Enter', code: 'Enter' });

    expect(handleKeyDown).toBeCalled();
  });

  it('renders "추가" button listening click event', () => {
    const { getByRole } = renderTitleField();

    fireEvent.click(getByRole('button', { name: 'add' }));

    expect(handleClick).toBeCalled();
  });
});
