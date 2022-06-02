import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

const LOCAL_STORAGE_KEY = "taskList";

interface Task {
  key: number;
  name: string;
  isCompleted: boolean;
}

function getTaskList() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
}

function setTaskList(setArray: Array<Task>) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setArray));
}

interface TodoListProps {
  taskList: Array<Task>;
  sectionName: string;
  toggleCompleted: (key: number) => void;
  removeFromArray: (key: number) => void;
}

function TodoList({ taskList, sectionName, toggleCompleted, removeFromArray }: TodoListProps) {
  if (!taskList.length)
    return null;
  return <>
    <h1>{sectionName}</h1>
    <ul>
      {taskList.map((obj, i) => <li key={obj.key}>
        <input type="checkbox" onChange={() => toggleCompleted(obj.key)} checked={obj.isCompleted} />
        {obj.name}
        <button onClick={() => removeFromArray(obj.key)}>Remove</button>
      </li>)}
    </ul>
  </>
}

function App() {
  const [objArr, setObjArr] = useState<Array<Task>>([]);
  const [task, setTask] = useState("");
  // todo: useRef()
  const [id, setId] = useState(0);

  const activeTodo = useMemo(() => objArr.filter(task => !task.isCompleted), [objArr]);
  const completedTodo = useMemo(() => objArr.filter(task => task.isCompleted), [objArr]);

  useEffect(() => {
    const newArr = getTaskList();
    let highestKey = 0;
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i].key > highestKey)
        highestKey = newArr[i].key;
    }
    setId(highestKey + 1);
    setObjArr(newArr);
  }, []);

  function addToArray(taskName: string) {
    const newId = id + 1;
    const tempArr = [...objArr, { key: newId, name: taskName, isCompleted: false }];
    setObjArr(tempArr);
    setId(newId);

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
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={task} />
        <button type="submit">Add Item</button>
      </form>
      <TodoList taskList={activeTodo} sectionName="Active" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray}/>
      <TodoList taskList={completedTodo} sectionName="Completed" toggleCompleted={toggleCompleted} removeFromArray={removeFromArray}/>
    </div>
  )
}

export default App;
