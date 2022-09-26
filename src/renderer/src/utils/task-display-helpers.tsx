import { Task } from '../../../common/models/task.model';

export function handleTaskField(task: string): string {
  if (task === '') {
    return 'No task specified';
  }
  return task;
}

export function sortTaskList(list: Task[]): Task[] {
  const sortedList = list.sort((t1: Task, t2: Task) => {
    return t1.dueDate.valueOf() - t2.dueDate.valueOf();
  });
  return sortedList;
}

export function setDocumentBgColour(colour: string) {
  document.querySelector('body').style.backgroundColor = colour;
}
