/* eslint-disable no-param-reassign */

import * as R from 'ramda';
import { createSlice } from '@reduxjs/toolkit';

const stringToDecimal = (target) => parseInt(target, 10);

const keysAsNumberFrom = (obj) => R.map(
  stringToDecimal,
  Object.keys(obj),
);

const initialState = {
  recentDeleted: [],
  selectedTaskId: 0,
  nextTaskId: 1,
  tasks: {
    0: { title: 'root', subTasks: [], isOpen: true },
  },
};

const { actions, reducer } = createSlice({
  name: 'todo',
  initialState,

  reducers: {
    addTask: (state, action) => {
      const { payload: newTaskTitle } = action;

      if (newTaskTitle === '') {
        return;
      }

      const newTask = { title: newTaskTitle, subTasks: [], isOpen: true };

      const { selectedTaskId, nextTaskId } = state;

      state.tasks[nextTaskId] = newTask;

      state.tasks[selectedTaskId].subTasks.push(nextTaskId);

      state.nextTaskId = nextTaskId + 1;
    },

    deleteTask: (state, action) => {
      state.selectedTaskId = 0;

      const { payload: targetId } = action;

      const deletedTask = state.tasks[targetId];

      state.tasks = R.omit([String(targetId)], state.tasks);

      const taskIds = keysAsNumberFrom(state.tasks);

      taskIds.forEach((id) => {
        const { subTasks } = state.tasks[id];

        if (subTasks.includes(targetId)) {
          const targetRemovedSubTasks = R.reject(R.equals(targetId), subTasks);
          state.tasks[id].subTasks = targetRemovedSubTasks;

          const restoreData = {
            task: deletedTask,
            selfId: targetId,
            parentId: id,
          };

          state.recentDeleted.push(restoreData);
        }
      });
    },

    restoreTask: (state) => {
      const restoreData = state.recentDeleted.pop();

      if (!restoreData) {
        return;
      }

      const { task, selfId, parentId } = restoreData;

      state.tasks[selfId] = task;
      state.tasks[parentId].subTasks.push(selfId);
    },

    updateSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload;
    },

    toggleOpen: (state, action) => {
      const { payload: id } = action;
      const { isOpen } = state.tasks[id];

      state.tasks[id].isOpen = !isOpen;
    },
  },
});

export const {
  addTask,
  deleteTask,
  restoreTask,
  updateSelectedTaskId,
  toggleOpen,
} = actions;

export default reducer;