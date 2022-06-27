const LOCAL_STORAGE_KEY = "taskList";

export interface Task {
  key: number;
  name: string;
  isCompleted: boolean;
}

export function getTaskList(initialString: string="[]") {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || initialString);
}

export function setTaskList(setArray: Array<Task>) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setArray));
}