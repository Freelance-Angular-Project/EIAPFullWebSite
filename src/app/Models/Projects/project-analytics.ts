export interface TopSchoolGlobal {
  schoolName: string;
  completedTasks: number;
}

export interface ProjectProgress {
  projectName: string;
  totalTasks: number;
  completedTasks: number;
  rejectedTasks: number;
  reviewTasks: number;
  totalSchools: number;
  totalSchoolsGlobal: number;
  totalTasksGlobal: number;
  completedTasksGlobal: number;
  rejectedTasksGlobal: number;
  topSchoolsGlobal: TopSchoolGlobal[];
}

export interface SchoolProgress {
  schoolName: string;
  totalTasks: number;
  completedTasks: number;
  rejectedTasks: number;
  reviewTasks: number;
}

export interface SchoolProgresses {
  [key: string]: SchoolProgress;
}

export interface ProgressData {
  projectProgress: ProjectProgress;
  schoolProgresses: SchoolProgresses;
}
