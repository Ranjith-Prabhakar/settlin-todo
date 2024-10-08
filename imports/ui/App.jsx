import React, { Fragment, useState } from 'react';
import { Task } from './Task.jsx';
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { TasksCollection } from '../api/TasksCollection.js';
import { TaskForm } from './TaskForm.jsx';
import { LoginForm } from './LoginForm';


export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  // what does it retreive whethere the entire user or a specific user?
  // shouldn't i create a publisher for access it 

  const isLoading = useSubscribe('tasks')
  const hideCompletedFilter = { isChecked: { $ne: true } };

  // const tasks = useTracker(() =>
  //   // onClick the button which will only changes the state and since we dont have any sideEffect hooks 
  //   // how the tasks automatically updating will this useTracker will work as useEffect ?

  //   TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
  //     sort: { createdAt: -1 },
  //   }).fetch()
  // );

  const tasks = useTracker(() => {
    if (!user) {
      return [];
    }

    return TasksCollection.find(
      hideCompleted ? hideCompletedFilter : {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
  });

  const handleToggleChecked = ({ _id, isChecked }) =>
    // where does the isChecked field is being set to the task collections 
    Meteor.callAsync("tasks.toggleChecked", { _id, isChecked });

  const handleDelete = ({ _id }) =>
    Meteor.callAsync("tasks.delete", { _id });

  const pendingTasksCount = useTracker(() => {
    if (!user) {
      return 0;
    }
    return TasksCollection.find(hideCompletedFilter).count()

  }
  );

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              📝️ To Do List
              {pendingTasksTitle}
            </h1>
          </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <Fragment>

            <div className="user" onClick={logout}>
              {user.username} 🚪
            </div>

            <TaskForm />

            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? 'Show All' : 'Hide Completed'}
              </button>
            </div>

            <ul className="tasks">
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={handleToggleChecked}
                  onDeleteClick={handleDelete}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}
