import React from 'react';
import './App.css';

function App() {
  const objArr = [{name: "eat", key: 0}, {name: "play elden ring :)", key: 1}, {name: "walk dogs", key: 2}, {name: "read", key: 3}]
  return (
    <ul>
      {objArr.map((obj, i) => <li key={obj.key}>
        {obj.name}
      </li>)}
    </ul>
  )
}

export default App;
