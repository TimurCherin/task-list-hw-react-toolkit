import { createSelector } from 'reselect';

export const selectTasks = (state) => state.tasks;
export const selectStatusFilter = (state) => state.filters;

export const selectFilteredTasksByStatus = createSelector(
  [selectTasks, selectStatusFilter],
  (tasks, filter) => {
    return tasks.filter((task) =>
      filter === 'all' ? true : filter === 'completed' ? task.completed : !task.completed
    );
  }
);

export const selectTaskCounts = createSelector(
  [selectTasks],
  (tasks) => {
    return {
      active: tasks.filter((task) => !task.completed).length,
      completed: tasks.filter((task) => task.completed).length,
    };
  }
);