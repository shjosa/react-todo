import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Fab, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './App.css';
import { TodoListCard } from './components/todo-list-card';
import { Task, getTaskList, setTaskList } from './utils/api';
import { Header } from './components/header';
import { NewTodoDialog } from './components/new-todo-dialog';

interface AppProps {
  initialObjArr?: Array<Task>;
}

function App({ initialObjArr=[] }: AppProps) {
  const initialObjArrRef = useRef(initialObjArr);
  const [objArr, setObjArr] = useState<Array<Task>>(initialObjArr);
  const [open, setOpen] = useState(false);
  const id = useRef(0);

  const activeTodo = useMemo(() => objArr.filter(task => !task.isCompleted), [objArr]);
  const completedTodo = useMemo(() => objArr.filter(task => task.isCompleted), [objArr]);

  useEffect(() => {
    const newArr = getTaskList(JSON.stringify(initialObjArrRef.current));
    let highestKey = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].key > highestKey)
        highestKey = newArr[i].key;
    }
    id.current = highestKey + 1;
    setObjArr(newArr);
  }, [initialObjArrRef]);

  function addToArray(taskName: string) {
    const newId = id.current + 1;
    const tempArr = [...objArr, { key: newId, name: taskName, isCompleted: false }];
    setObjArr(tempArr);
    id.current = newId;

    setTaskList(tempArr);
  }

  function removeFromArray(key: number): void {
    const tempArr = [...objArr];
    const pos = tempArr.findIndex(task => task.key === key);
    tempArr.splice(pos, 1);
    setObjArr(tempArr);

    setTaskList(tempArr);
  }

  function toggleCompleted(key: number): void {
    const tempArr = [...objArr];
    const pos = tempArr.findIndex(task => task.key === key);
    tempArr[pos].isCompleted = !tempArr[pos].isCompleted;
    setObjArr(tempArr);

    setTaskList(tempArr);
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Header>React Todo</Header>
      <NewTodoDialog open={open} handleClose={handleClose} addToArray={addToArray} dialogTitle="Add a task" buttonText="Add Task" inputLabel="task name" />
      <Grid container direction="column" spacing={2} p={2}>
        <TodoListCard taskList={activeTodo} title="Active" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray} testid="active" />
        <TodoListCard taskList={completedTodo} title="Completed" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray} testid="completed" />
      </Grid>
      <Fab color="secondary" onClick={handleOpen} sx={{ position: "fixed", bottom: 16, right: 16 }} aria-label={'add a to-do'}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default App;
