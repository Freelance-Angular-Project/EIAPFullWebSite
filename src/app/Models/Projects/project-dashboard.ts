

export interface ProjectDashboard {
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
  startDate: string;  // Consider using Date type if you handle dates as Date objects
  endDate: string;    // Consider using Date type if you handle dates as Date objects
  resultAnnouncement: string;  // Consider using Date type if appropriate
  files: any[];  // Define more specific type if possible
  imageUrl: string;
}
