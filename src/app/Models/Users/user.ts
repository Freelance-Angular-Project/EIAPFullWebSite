export interface User {
  // Assuming the registration endpoints return a user object with these fields
  id?: string;
  name?: string;
  email?: string;
  role: string[];
  // Include other user properties as needed
}
