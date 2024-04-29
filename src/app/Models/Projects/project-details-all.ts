export interface TaskForProjectDetails {
  id: string;
  name: string;
  details: string;
  createdAt: string;
  endDate: string;
  projectId: string;
}
export interface ProjectFileForProjectDetails {
  id: string;
  projectId: string;
  name: string;
  description: string;
  created: string;
  endDate: string;
  isPublic: boolean;
  url: string;
  fileName: string;
}
export interface SchoolForProjectDetails {
  id: string;
  userId: string;
  name: string;
  schoolEmail: string;
  code: string;
  curriculums: string;
  educationType: string;
  grade: string;
  zone: string;
}

export interface ProjectDetailsAll {
  id: string;
  userId: string;
  investigatorId: string;
  name: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  startDate: string;
  endDate: string;
  resultAnnouncement: string;
  tasks: TaskForProjectDetails[];
  files: ProjectFileForProjectDetails[];
  schools: SchoolForProjectDetails[];
  imageUrl: string;
}
