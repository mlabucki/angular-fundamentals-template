// @ts-nocheck
// Add your code here
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coursesFeatureKey, CoursesState } from "./courses.reducer";

// Select the courses feature state
export let selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

// Selectors for loading states
export let isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state: CoursesState) => {
    debugger;
    console.log("isAllCoursesLoadingSelector  state:", state);
    return state.isAllCoursesLoading;
  }
);

export let isSearchingStateSelector;

export let isSingleCourseLoadingSelector;

// Selector for getting all courses
export let getAllCourses;

// Selector for getting a specific course
export let getCourse;

// Selector for getting the error message
export let getErrorMessage;
