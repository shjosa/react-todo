import React, {useEffect, useState} from 'react';
import './App.css';

interface Task {
  key: number;
  name: string;
}

function App() {
  const [objArr, setObjArr] = useState<Array<Task>>([]);
  const [task, setTask] = useState("");
  // todo: useRef()
  const [id, setId] = useState(0);

  function addToArray(taskName: string) {
    const newId = id + 1;
    const tempArr = [...objArr, {key: newId, name: taskName}];
    setObjArr(tempArr);
    setId(newId);

    localStorage.setItem("taskList", JSON.stringify(tempArr));
  }

  function removeFromArray (pos: number): void {
    const tempArr = [...objArr];
    tempArr.splice(pos, 1);
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

  useEffect(() => {
    setObjArr(JSON.parse(localStorage.getItem("taskList") || "[]"));
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} value={task} />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {objArr.map((obj, i) => <li key={obj.key}>
          <button onClick={() => removeFromArray(i)}>Remove</button>
          {obj.name}
        </li>)}
      </ul>
    </div>
  )
}

export default App;
