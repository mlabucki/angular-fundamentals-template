// @ts-nocheck
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import * as CoursesActions from "./courses.actions";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      mergeMap(() => {
        console.log(
          "getAll$ effect triggered - calling coursesService.getAll()"
        );
        return this.coursesService.getAll().pipe(
          map((response) => {
            console.log("getAll$ success - response:", response);
            return CoursesActions.requestAllCoursesSuccess({
              courses: response.result,
            });
          }),
          catchError((error) => {
            console.log("getAll$ error:", error);
            return of(
              CoursesActions.requestAllCoursesFail({ error: error.message })
            );
          })
        );
      })
    )
  );

  filteredCourses$: Observable<any>; // replace the type

  getSpecificCourse$: Observable<any>; // replace the type

  deleteCourse$: Observable<any>; // replace the type

  editCourse$: Observable<any>; // replace the type

  createCourse$: Observable<any>; // replace the type

  redirectToTheCoursesPage$: Observable<any>; // replace the type
}
