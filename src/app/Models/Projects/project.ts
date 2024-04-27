export interface Project {
  id: string;
  userId?: string;
  investigatorId: string;
  name: string;
  title1: string;
  description1: string;
  title2: string;
  description2: string;
  title3: string;
  description3: string;
  startDate: Date; // or Date for date objects
  endDate: Date; // or Date for date objects
  resultAnnouncement: string;
  files?: ProjectFile[]; // Specify the type if you know the structure of files
  imageUrl: string;
}

export interface ProjectFile {
  created: string;        // Assuming date and time as string
  description: string;
  endDate: string;        // Assuming date and time as string
  fileName: string;
  id: string;
  isPublic: boolean;
  name: string;
  projectId: string;
  url: string;
}
