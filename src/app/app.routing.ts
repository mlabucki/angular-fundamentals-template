import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  PageNotFoundComponent,
} from "./shared/components";
import { CoursesComponent } from "./features/courses/courses.component";
import { CourseInfoComponent } from "./features/course-info/course-info.component";

const routes: Routes = [
  { path: "login", component: LoginFormComponent },
  { path: "registration", component: RegistrationFormComponent },
  { path: "courses", component: CoursesComponent },
  { path: "courses/add", component: CourseFormComponent },
  { path: "courses/:id", component: CourseInfoComponent },
  { path: "courses/edit/:id", component: CourseFormComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
