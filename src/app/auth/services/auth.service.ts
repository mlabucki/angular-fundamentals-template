import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject, of, tap, map } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { SessionStorageService } from "./session-storage.service";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface AuthResponse {
  successful: boolean;
  result: string; // token
  user: {
    email: string;
    name: string | null;
  };
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly baseUrl = "http://localhost:4000";
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    const token = this.sessionStorage.getToken();
    if (token) {
      this.isAuthorized$$.next(true);
    }
  }

  login(user: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, user).pipe(
      tap((response) => {
        if (response.successful) {
          this.setToken(response.result);
        }
      })
    );
  }

  logout(): Observable<any> {
    this.sessionStorage.deleteToken();
    this.isAuthorized$$.next(false);
    return of({ success: true });
  }

  register(user: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user);
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return "/login";
  }

  setToken(token: string) {
    this.sessionStorage.setToken(token);
    this.isAuthorized$$.next(true);
  }

  getToken(): string | null {
    return this.sessionStorage.getToken();
  }
}
