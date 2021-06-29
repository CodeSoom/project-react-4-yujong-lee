import { useAppDispatch, useAppSelector } from '../redux_modules/hook';
import { deleteTask, toggleOpen } from '../redux_modules/todoSlice';
import TaskButton from './TaskButton';

type TaskButtonContainerProps = {
  id: number
};

const TaskButtonContainer = ({ id }: TaskButtonContainerProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const { subTasks, isOpen } = useAppSelector((state) => state.todo.tasks[id]);

  const isSubTasksEmpty = (subTasks.length === 0);

  const handleClickComplete = () => dispatch(deleteTask(id));
  const handleClickDetail = () => dispatch(toggleOpen(id));

  return (
    <TaskButton
      id={id}
      isSubTasksEmpty={isSubTasksEmpty}
      isSubTasksOpen={isOpen}
      handleClickComplete={handleClickComplete}
      handleClickDetail={handleClickDetail}
    />
  );
};

export default TaskButtonContainer;
