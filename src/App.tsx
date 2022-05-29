import React, {useState} from 'react';
import './App.css';

function App() {
  const [objArr, setObjArr] = useState([{name: "eat", key: 0}, {name: "play elden ring :)", key: 1}, {name: "walk dogs", key: 2}, {name: "read", key: 3}])
  // todo: useRef()
  let [id, setId] = useState(4);

  function addToArray() {
    const newId = id + 1;
    setObjArr([...objArr, {key: newId, name: "new todo"}]);
    setId(newId);
  }

  return (
    <div>
      <button onClick={addToArray}>Add Item</button>
      <ul>
        {objArr.map((obj, i) => <li key={obj.key}>
          {obj.name}
        </li>)}
      </ul>
    </div>
  )
}

export default App;
