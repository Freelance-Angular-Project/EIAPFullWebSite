export interface LoginResponse {
  message:string;
  isAuthenticated:boolean;
  email:string;
  role:string[];
  token: string;
}
