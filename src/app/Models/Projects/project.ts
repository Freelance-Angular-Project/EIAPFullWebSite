export interface Project {
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
  startDate: Date; // or Date for date objects
  endDate: Date; // or Date for date objects
  resultAnnouncement: string;
  files?: any[]; // Specify the type if you know the structure of files
  imageUrl: string;
}
