export class TaskModel {
  title: string;
  user: string;
  deadline?: Date;
  priority?: number;
  done: boolean;
}