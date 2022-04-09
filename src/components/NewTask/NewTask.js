import { useState } from 'react';
import useHttp from '../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const dataHandler = (taskText, data) => {
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  }

  const {isLoading, error, sendRequest: sendTaskHandler}=useHttp()

  const enterTaskHandler = async (taskText) => {
    sendTaskHandler({
      url: 'https://tasklist-e54ff-default-rtdb.firebaseio.com/tasks.json',
      method: 'POST',
      body: { text: taskText },
      headers: {
        'Content-Type': 'application/json',
      },
    },dataHandler.bind(null, taskText)) //bind here preconfigure first argument as tasktext in datahandler, other args may passed by usr will append to it. first arg to bind is for this keyword which we don't need here
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
