import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, toggleTask, deleteTask } from '../redux/tasks/reducer';
import { setFilter } from '../redux/filters/actions';
import { selectFilteredTasksByStatus, selectTaskCounts } from '../redux/selectors';
import styles from './TaskList.module.css';

const TaskList = () => {
  const filteredTasks = useSelector(selectFilteredTasksByStatus);
  const taskCounts = useSelector(selectTaskCounts);
  const dispatch = useDispatch();
  const [text, setText] = useState('');

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
        />
        <button
          className={styles.addButton}
          onClick={() => {
            if (text.trim()) {
              dispatch(addTask(text));
              setText('');
            }
          }}
        >
          Add
        </button>
      </div>
      <div className={styles.filters}>
        <button onClick={() => dispatch(setFilter('all'))}>All</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
        <button onClick={() => dispatch(setFilter('active'))}>Active</button>
      </div>
      <div className={styles.stats}>
        <p>Active: {taskCounts.active}  Completed: {taskCounts.completed}</p>
      </div>
      <ul className={styles.taskList}>
        {filteredTasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <span
              className={task.completed ? styles.completed : ''}
              onClick={() => {
                if (task.id >= 4) {
                  dispatch(toggleTask(task));
                }
              }}
            >
              {task.text}
            </span>
            {task.id >= 4 && (
              <button
                className={styles.deleteButton}
                onClick={() => dispatch(deleteTask(task.id))}
              >
                X
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;