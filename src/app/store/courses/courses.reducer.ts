// @ts-nocheck
import { Action, createReducer, on } from "@ngrx/store";
import { Course } from "@app/types/courseTypes";
import * as CoursesActions from "./courses.actions";

// Add your code here
export let coursesFeatureKey = "courses";

export interface CoursesState {
  allCourses: Course[]; // If necessary, replace the type
  course: Course | null; // If necessary, replace the type
  isAllCoursesLoading: boolean;
  isSingleCourseLoading: boolean;
  isSearchState: boolean;
  errorMessage: string;
}

export const initialState: CoursesState = {
  allCourses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: "",
};

export let coursesReducer = createReducer(
  initialState,

  on(CoursesActions.requestAllCourses, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestAllCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestSingleCourse, (state) => ({
    ...state,
    isSingleCourseLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestSingleCourseSuccess, (state, { course }) => ({
    ...state,
    course: course,
    isSingleCourseLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestSingleCourseFail, (state, { error }) => ({
    ...state,
    isSingleCourseLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestFilteredCourses, (state) => ({
    ...state,
    isSearchState: true,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesSuccess, (state, { courses }) => ({
    ...state,
    allCourses: courses,
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestFilteredCoursesFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestDeleteCourse, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseSuccess, (state) => ({
    ...state,
    errorMessage: "",
  })),

  on(CoursesActions.requestDeleteCourseFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  })),

  on(CoursesActions.requestEditCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: state.allCourses.map((c) => (c.id === course.id ? course : c)),
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestEditCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  })),

  on(CoursesActions.requestCreateCourse, (state) => ({
    ...state,
    isAllCoursesLoading: true,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseSuccess, (state, { course }) => ({
    ...state,
    allCourses: [...state.allCourses, course],
    isAllCoursesLoading: false,
    errorMessage: "",
  })),

  on(CoursesActions.requestCreateCourseFail, (state, { error }) => ({
    ...state,
    isAllCoursesLoading: false,
    errorMessage: error,
  }))
);

export let reducer = (state: CoursesState, action: Action): CoursesState =>
  coursesReducer(state, action);
