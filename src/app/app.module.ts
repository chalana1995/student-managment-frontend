import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, UploadInterceptor } from './app.component';
import { LabelModule } from '@progress/kendo-angular-label';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { HeaderComponent } from './header/header.component';
import { StudentComponent } from './student/student.component';
import { EditComponent } from './student/edit/edit.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ToastrModule } from 'ngx-toastr';
import {NgxPaginationModule} from 'ngx-pagination';
import { GridModule } from '@progress/kendo-angular-grid';
import { UploadModule } from '@progress/kendo-angular-upload';
import { FooterComponent } from './footer/footer.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import {StoreModule} from '@ngrx/store';
import {StudentReducer} from './reducer/student.reducer';
import {StudentEffects} from './effect/student.effect';
import { EffectsModule } from '@ngrx/effects'



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StudentComponent,
    EditComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LabelModule,
    BrowserAnimationsModule,
    ButtonsModule,
    InputsModule,
    DateInputsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    GridModule,
    UploadModule,
    DialogsModule,
    StoreModule.forRoot({student: StudentReducer}, {}),
    EffectsModule.forRoot([
      StudentEffects
    ])

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: UploadInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
