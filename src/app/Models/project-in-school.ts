import { Task } from "./task";

export interface ProjectInSchool {
  id: string;
  name: string;
  taskCompletePercentage: number;
  completeTask: number;
  regectedTasks: number; // Assuming "regectedTasks" is a typo, corrected to "rejectedTasks"
  newTasks: number;
  totalTasks: number;
  tasks: Task[];
}
