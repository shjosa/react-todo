import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
  const [objArr, setObjArr] = useState([{name: "eat", key: 0}, {name: "play elden ring :)", key: 1}, {name: "walk dogs", key: 2}, {name: "read", key: 3}]);
  const [task, setTask] = useState("");
  // todo: useRef()
  const [id, setId] = useState(4);

  function addToArray(taskName: string) {
    const newId = id + 1;
    const tempArr = [...objArr, {key: newId, name: taskName}];
    setObjArr(tempArr);
    setId(newId);

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
          {obj.name}
        </li>)}
      </ul>
    </div>
  )
}

export default App;
