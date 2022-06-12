import React, { useEffect, useState, useMemo, useRef } from 'react';
import { AppBar, Toolbar, Fab, Modal, Box, Typography, TextField, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import './App.css';
import { TodoList } from './components/todo-list';
import { Task, getTaskList, setTaskList } from './utils/api';

function App() {
  const [objArr, setObjArr] = useState<Array<Task>>([]);
  const [task, setTask] = useState("");
  const [open, setOpen] = useState(false);
  const id = useRef(0);

  const activeTodo = useMemo(() => objArr.filter(task => !task.isCompleted), [objArr]);
  const completedTodo = useMemo(() => objArr.filter(task => task.isCompleted), [objArr]);

  useEffect(() => {
    const newArr = getTaskList();
    let highestKey = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].key > highestKey)
        highestKey = newArr[i].key;
    }
    id.current = highestKey + 1;
    setObjArr(newArr);
  }, []);

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

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTask(e.target.value);
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addToArray(task);
    setTask("");
    handleClose();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const styleSubmit = {
    float: 'right',
    top: '10px',
  };

  const boxStyle = {
    bgcolor: 'lightblue',
    borderRadius: '20px',
  };

  return (
    <div>
      <AppBar color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            React Todo
          </Typography>
        </Toolbar>
      </AppBar>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <Box
          sx={style}
          component="form"
          onSubmit={onSubmit}
        >
          <Typography>Add a new item</Typography>
          <TextField fullWidth onChange={onChange} value={task}></TextField>
          <Fab color="secondary" type="submit" sx={styleSubmit}>
            <AddIcon />
          </Fab>
        </Box>
      </Modal>
      <br />
      <br />
      <br />
      <Grid container>
        <Grid item xs={6} sx={boxStyle}>
          <TodoList taskList={activeTodo} sectionName="Active" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray} />
        </Grid>
        <Grid item xs={6} sx={boxStyle}>
          <TodoList taskList={completedTodo} sectionName="Completed" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray} />
        </Grid>
      </Grid>
      <Fab color="secondary" onClick={handleOpen} sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
    </div>
  )
}

export default App;
