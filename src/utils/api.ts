const LOCAL_STORAGE_KEY = "taskList";

export interface Task {
  key: number;
  name: string;
  isCompleted: boolean;
}

export function getTaskList() {
  return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
}

export function setTaskList(setArray: Array<Task>) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(setArray));
}