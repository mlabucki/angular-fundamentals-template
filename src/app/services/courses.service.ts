import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

export interface Course {
  id: string;
  title: string;
  description: string;
  creationDate: string | Date;
  duration: number;
  authors: string[];
  isTopRated?: boolean;
}

export interface Author {
  id: string;
  name: string;
}

interface ApiResponse<T> {
  successful: boolean;
  result: T;
}

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = "http://localhost:4000";

  constructor(private http: HttpClient) {}

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/courses/all`);
  }

  createCourse(
    course: Omit<Course, "id" | "creationDate">
  ): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.apiUrl}/courses/add`,
      course
    );
  }

  editCourse(
    id: string,
    course: Omit<Course, "id" | "creationDate">
  ): Observable<ApiResponse<string>> {
    return this.http.put<ApiResponse<string>>(
      `${this.apiUrl}/courses/${id}`,
      course
    );
  }

  getCourse(id: string): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(
      `${this.apiUrl}/courses/${id}`
    );
  }

  filterCourses(query: string): Observable<Course[]> {
    return this.http.get<Course[]>(
      `${this.apiUrl}/courses/filter?title=${query}`
    );
  }

  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(author: Omit<Author, "id">): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(
      `${this.apiUrl}/authors/add`,
      author
    );
  }

  getAuthorById(id: string): Observable<Author> {
    return this.http.get<Author>(`${this.apiUrl}/authors/${id}`);
  }
}
