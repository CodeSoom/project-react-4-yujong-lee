import reducer,
{
  addTask,
  deleteTask,
  toggleOpen,
  updateCurrentTaskId,
} from './todoSlice';

describe('todoSlice', () => {
  context('when title is not empty string', () => {
    it('adds new task to todoList and updates nextTaskId', () => {
      const oldState = {
        recentDeleted: [],
        currentTaskId: 1,
        nextTaskId: 2,
        tasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      };
      const newState = {
        recentDeleted: [],
        currentTaskId: 1,
        nextTaskId: 3,
        tasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [2], isOpen: true },
          2: { title: 'task2', subTasks: [], isOpen: true },
        },
      };

      expect(reducer(
        oldState,
        addTask('task2'),
      )).toEqual(newState);
    });
  });

  context('when title is empty string', () => {
    it('does nothing', () => {
      const oldState = {
        recentDeleted: [],
        currentTaskId: 1,
        nextTaskId: 2,
        tasks: {
          0: { title: 'root', subTasks: [1], isOpen: true },
          1: { title: 'task1', subTasks: [], isOpen: true },
        },
      };

      expect(reducer(
        oldState,
        addTask(''),
      )).toEqual(oldState);
    });
  });

  it('deletes task, reset currentTaskId', () => {
    const oldState = {
      recentDeleted: [],
      currentTaskId: 2,
      nextTaskId: 2,
      tasks: {
        0: { title: 'root', subTasks: [2], isOpen: true },
        2: { title: '두번째 할일', subTasks: [], isOpen: true },
      },
    };
    const newState = {
      recentDeleted: [],
      currentTaskId: 0,
      nextTaskId: 2,
      tasks: { 0: { title: 'root', subTasks: [], isOpen: true } },
    };

    expect(reducer(
      oldState,
      deleteTask(2),
    )).toEqual(newState);
  });

  it('updates current task id', () => {
    const oldState = {
      recentDeleted: [],
      currentTaskId: 0,
      nextTaskId: 2,
      tasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: '첫번째 할일', subTasks: [], isOpen: true },
      },
    };
    const newState = {
      recentDeleted: [],
      currentTaskId: 1,
      nextTaskId: 2,
      tasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: '첫번째 할일', subTasks: [], isOpen: true },
      },
    };

    expect(reducer(
      oldState,
      updateCurrentTaskId(1),
    )).toEqual(newState);
  });

  it('toggles isOpen with taskId', () => {
    const oldState = {
      recentDeleted: [],
      currentTaskId: 0,
      nextTaskId: 2,
      tasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: '첫번째 할일', subTasks: [], isOpen: true },
      },
    };

    const newState = {
      recentDeleted: [],
      currentTaskId: 0,
      nextTaskId: 2,
      tasks: {
        0: { title: 'root', subTasks: [1], isOpen: true },
        1: { title: '첫번째 할일', subTasks: [], isOpen: false },
      },
    };
    expect(reducer(
      oldState,
      toggleOpen(1),
    )).toEqual(newState);
  });
});
