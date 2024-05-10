import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { User } from '../../Models/Users/user';
import { LoginResponse } from '../../Models/Accounts/login-response';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment.development';
import { Account } from '../../Models/Accounts/account';
import { Role } from '../../Models/Accounts/role';
import { UpdateAccount } from '../../Models/Accounts/update-account';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.baseApiURL}/Account`; // Replace with the actual base URL
  // Define the headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'text/plain',
      // Add any other header you need here
    }),
  };

  currentUser: User = {} as User;
  userLoggedBehavior: BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.userLoggedBehavior = new BehaviorSubject<boolean>(this.isUserLogged);
  }

  // login
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.baseUrl}/login`,
        { email, password },
        this.httpOptions
      )
      .pipe(
        tap((res) => {
          if (res.isAuthenticated) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role[0]);
            // localStorage.setItem('roles', JSON.stringify(res.role[0]));
            this.currentUser = { email: res.email, role: res.role.slice(0, 1) };
            this.userLoggedBehavior.next(true);

            // console.log(this.currentUser);
          }
        }),
        // catchError((error) => {
        //   // console.error('Login error:', error);
        //   return throwError(() => new Error(error.error));
        // })
      );
  }

  getUsersInRole(roleName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/usersInRole/${roleName}`);
  }

  // Helper method to check if the current user has a specific role
  // hasRole(roleName: string): boolean {
  //   return (
  //     this.currentUser &&
  //     Array.isArray(this.currentUser.role) &&
  //     this.currentUser.role.includes(roleName)
  //   );
  // }

  getuRoles(roleName: string): boolean {
    return localStorage.getItem('role') == roleName ? true : false;
  }
  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.userLoggedBehavior.next(false);
  }
  getUserLoggedStatus(): Observable<boolean> {
    return this.userLoggedBehavior.asObservable();
  }

  getCurrentUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      // Adjust 'userId' to match the property in your token's payload
      return decoded.uid;
    } catch (error) {
      console.error('Decoding token failed', error);
      return null;
    }
  }

  // Replace the parameter and return types with the correct ones based on your API
  registerProjectManager(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}/registerProjectManager`,
      account,
      this.httpOptions
    );
  }

  registerSchoolManager(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}/registerSchoolManager`,
      account,
      this.httpOptions
    );
  }

  registerInvestigated(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}/registerInvestigated`,
      account,
      this.httpOptions
    );
  }

  registerAdmin(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}/registerAdmin`,
      account,
      this.httpOptions
    );
  }

  getProfile(): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/Profile`);
  }

  deleteAccount(id: string): Observable<Account> {
    return this.http.delete<Account>(
      `${this.baseUrl}?id=${id}`,
      this.httpOptions
    );
  }
  updateAccount(account: UpdateAccount): Observable<UpdateAccount> {
    return this.http.put<UpdateAccount>(
      `${this.baseUrl}/UpdateUser`,
      account,
      this.httpOptions
    );
  }
}
