// @ts-nocheck
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Course } from "@app/types/courseTypes";
import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { State } from "../index";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isAllCoursesLoadingSelector
  );
  isSingleCourseLoading$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSingleCourseLoadingSelector
  );
  isSearchingState$: Observable<boolean> = this.store.select(
    CoursesSelectors.isSearchingStateSelector
  );
  courses$: Observable<Course[]> = this.store.select(
    CoursesSelectors.getAllCourses
  );
  allCourses$: Observable<Course[]> = this.store.select(
    CoursesSelectors.getAllCourses
  );
  course$: Observable<Course | null> = this.store.select(
    CoursesSelectors.getCourse
  );
  errorMessage$: Observable<string> = this.store.select(
    CoursesSelectors.getErrorMessage
  );

  constructor(private store: Store<State>) {}

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    // Add your code here
  }

  getFilteredCourses(searchValue: string): void {
    // Add your code here
  }

  editCourse(body: any, id: string): void {
    // Add your code here
  }

  createCourse(body: any): void {
    // Add your code here
  }

  deleteCourse(id: string): void {
    // Add your code here
  }
}
