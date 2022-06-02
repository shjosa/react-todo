import React, {useEffect, useState, useMemo} from 'react';
import './App.css';

interface Task {
  key: number;
  name: string;
  isCompleted: boolean;
}

function App() {
  const [objArr, setObjArr] = useState<Array<Task>>([]);
  const [task, setTask] = useState("");
  // todo: useRef()
  const [id, setId] = useState(0);

  const activeTodo = useMemo(() => objArr.filter(task => !task.isCompleted), [objArr]);
  const completedTodo = useMemo(() => objArr.filter(task => task.isCompleted), [objArr]);

  useEffect(() => {
    const newArr = JSON.parse(localStorage.getItem("taskList") || "[]");
    let highestKey = 0;
    for(let i = 0; i < newArr.length; i++) {
      if (newArr[i].key > highestKey)
        highestKey = newArr[i].key;
    }
    setId(highestKey + 1);
    setObjArr(newArr);
  }, []);

  function addToArray(taskName: string) {
    const newId = id + 1;
    const tempArr = [...objArr, {key: newId, name: taskName, isCompleted: false}];
    setObjArr(tempArr);
    setId(newId);

    localStorage.setItem("taskList", JSON.stringify(tempArr));
  }

  function removeFromArray(pos: number): void {
    const tempArr = [...objArr];
    tempArr.splice(pos, 1);
    setObjArr(tempArr);

    localStorage.setItem("taskList", JSON.stringify(tempArr));
  }

  function toggleCompleted(pos: number): void {
    const tempArr = [...objArr];
    tempArr[pos].isCompleted = !tempArr[pos].isCompleted;
    setObjArr(tempArr);

    localStorage.setItem("taskList", JSON.stringify(tempArr));
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
      <h1>Active</h1>
      <ul>
        {activeTodo.map((obj, i) => <li key={obj.key}>
          <input type="checkbox" onChange={() => toggleCompleted(i)} checked={obj.isCompleted}/>
          {obj.name}
          <button onClick={() => removeFromArray(i)}>Remove</button>
        </li>)}
      </ul>
      <h1>Completed</h1>
      <ul>
        {completedTodo.map((obj, i) => <li key={obj.key}>
          <input type="checkbox" onChange={() => toggleCompleted(i)} checked={obj.isCompleted}/>
          {obj.name}
          <button onClick={() => removeFromArray(i)}>Remove</button>
        </li>)}
      </ul>
    </div>
  )
}

export default App;
