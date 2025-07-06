import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { CommonModule } from "@angular/common";
import { CourseFormComponent } from "@app/shared/components";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { CoursesListComponent } from "./courses-list/courses-list.component";
import { CourseInfoModule } from "../course-info/course-info.module";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";

const routes: Routes = [
  {
    path: "add",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: "edit/:id",
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard],
  },
  {
    path: ":id",
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard],
  },
  { path: "", component: CoursesComponent, canActivate: [AuthorizedGuard] },
];

@NgModule({
  declarations: [CoursesComponent, CoursesListComponent],
  imports: [
    SharedModule,
    CommonModule,
    CourseInfoModule,
    RouterModule.forChild(routes),
  ],
})
export class CoursesModule {}
