import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ModalComponent } from "@shared/components/modal/modal.component";
import { HeaderComponent } from "@shared/components/header/header.component";
import { InfoComponent } from "@shared/components/info/info.component";
import { SearchComponent } from "@shared/components/search/search.component";
import { ButtonComponent } from "@shared/components/button/button.component";
import { CourseCardComponent } from "@shared/components/course-card/course-card.component";
import { LoginFormComponent } from "@shared/components/login-form/login-form.component";
import { RegistrationFormComponent } from "@shared/components/registration-form/registration-form.component";
import { CourseFormComponent } from "@shared/components/course-form/course-form.component";
import { FormsModule } from "@angular/forms";
import { CustomDatePipe, DurationPipe, AuthorNamesPipe } from "./pipes/pipes";
import { EmailValidatorDirective } from "@shared/directives/email.directive";

const components = [
  ModalComponent,
  HeaderComponent,
  InfoComponent,
  SearchComponent,
  ButtonComponent,
  CourseCardComponent,
  LoginFormComponent,
  RegistrationFormComponent,
  CourseFormComponent,
  CustomDatePipe,
  DurationPipe,
  AuthorNamesPipe,
  EmailValidatorDirective,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  exports: components,
})
export class SharedModule {}
