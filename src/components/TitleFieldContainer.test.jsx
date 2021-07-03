/**
 * @jest-environment jsdom
 */

import { useDispatch } from 'react-redux';
import { fireEvent, render } from '@testing-library/react';

import { addTask } from '../redux_module/todoSlice';
import TitleFieldContainer from './TitleFieldContainer';

describe('Input', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockReturnValue(dispatch);
  });

  it('adds tasks with button', () => {
    const { getByRole } = render(<TitleFieldContainer initialTitle="task1" />);

    fireEvent.click(getByRole('button', { name: '추가' }));

    expect(dispatch).toBeCalledWith(
      addTask('task1'),
    );
  });
});
