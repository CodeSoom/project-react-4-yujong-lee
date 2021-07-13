/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'ramda';

import {
  addRestoreData,
  removeTaskIdFromParentSubTasks,
  removeTaskFromRemaingTasks,
} from './helper';

const initialState = {
  isLogBookOpen: false,
  completedTasks: [],
  selectedTaskId: 0,
  nextTaskId: 1,
  remainingTasks: {
    0: { title: 'root', subTasks: [], isOpen: true },
  },
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    addTask: (state, action) => {
      const { selectedTaskId, nextTaskId } = state;
      const { payload: newTaskTitle } = action;

      const typed = (newTaskTitle !== '');

      if (!typed) {
        return;
      }

      state.nextTaskId = nextTaskId + 1;

      state.remainingTasks[selectedTaskId].subTasks.unshift(nextTaskId);

      const newTask = { title: newTaskTitle, subTasks: [], isOpen: true };

      state.remainingTasks[nextTaskId] = newTask;
    },

    deleteTask: (state, action) => {
      const { payload: targetId } = action;

      state.selectedTaskId = 0;

      addRestoreData(state, targetId);

      removeTaskFromRemaingTasks(state, targetId);

      removeTaskIdFromParentSubTasks(state, targetId);
    },

    restoreTask: (state) => {
      if (isEmpty(state.completedTasks)) {
        return;
      }

      const restoreData = state.completedTasks.pop();

      if (isEmpty(state.completedTasks)) {
        state.isLogBookOpen = false;
      }

      const { task, selfId, parentId } = restoreData;
      const { subTasks } = state.remainingTasks[parentId];

      state.remainingTasks[selfId] = task;
      state.remainingTasks[parentId].subTasks = [...subTasks, selfId].sort().reverse();
    },

    updateSelectedTaskId: (state, action) => {
      const { payload: id } = action;

      state.selectedTaskId = id;
    },

    toggleSubTasksOpen: (state, action) => {
      const { payload: id } = action;
      const { isOpen } = state.remainingTasks[id];

      state.remainingTasks[id].isOpen = !isOpen;
    },

    toggleLogBookOpen: (state, action) => {
      const { payload: want } = action;

      state.isLogBookOpen = (want === undefined)
        ? !state.isLogBookOpen
        : want;
    },

    emptyCompletedTasks: (state) => {
      state.completedTasks = [];
    },
  },

});

export const {
  addTask,
  deleteTask,
  restoreTask,
  updateSelectedTaskId,
  toggleSubTasksOpen,
  emptyCompletedTasks,
  toggleLogBookOpen,
} = actions;

export default reducer;
