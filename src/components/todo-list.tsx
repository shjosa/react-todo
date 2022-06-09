import { Task } from '../utils/api';

interface TodoListProps {
    taskList: Array<Task>;
    sectionName: string;
    toggleCompleted: (key: number) => void;
    removeFromArray: (key: number) => void;
}
  
export function TodoList({ taskList, sectionName, toggleCompleted, removeFromArray }: TodoListProps) {
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