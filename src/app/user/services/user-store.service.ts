import { Injectable } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string>("");
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$ = this.name$$.asObservable();
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): void {
    // Add your code here
    this.userService
      .getUser()
      .pipe(map((res) => res.result))
      .subscribe({
        next: (user) => {
          this.name$$.next(user.name);
          this.isAdmin$$.next(user.role.toLowerCase() === "admin");
        },
        error: () => {
          this.name$$.next("");
          this.isAdmin$$.next(false);
        },
      });
  }

  get isAdmin(): boolean {
    // Add your code here. Get isAdmin$$ value
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    // Add your code here. Change isAdmin$$ value
    this.isAdmin$$.next(value);
  }
}
