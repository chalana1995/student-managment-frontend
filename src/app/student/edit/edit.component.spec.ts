import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentReducer, StudentState } from 'src/app/reducer/student.reducer';

import { EditComponent } from './edit.component';
import AppState from '../../model/app-state.model';
import { StudentService } from 'src/app/service/student.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { of } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let studentService;
  let STUDENTS;
  // let toastService: ToastrService;
  // let store: Store<AppState>;
  // let route: ActivatedRoute;
  // let router: Router
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('student', StudentReducer),
        ToastrModule.forRoot()
      ],
      declarations: [EditComponent],
      providers: [
        // provideMockStore(),
        { provide: ToastrService, useClass: ToastrService },
        // {provide: StudentService, useClass: mockStudentService},
        // {provide: ToastrService, useClass: ToastrService},
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {

    // TestBed.configureTestingModule({
    //   declarations: [EditComponent],
    //   providers: [StudentService]
    // })

    fixture = TestBed.createComponent(EditComponent);
    httpClient = TestBed.inject(HttpClient);

    component = fixture.componentInstance;
    fixture.detectChanges();

    STUDENTS = { name: "a", dateofbirth: "a", email: "a", age: 3 }

    // fixture = TestBed.createComponent(EditComponent);
    // component = fixture.componentInstance;
    // studentService = TestBed.get(StudentService);
    // httpClient = TestBed.inject(HttpClient);
    studentService = jasmine.createSpyObj(['AddStudentAction', 'UpdateStudentAction']);

    //component = new EditComponent(route,studentService,router, toastService,store);
  })

  it('should create EditComponent', () => {
    expect(component).toBeTruthy();
  });

  it('[Email-check] - should check the email address is invalid', () => {
    let email = component.form.controls['email'];
    // expect(email.valid).toBeFalsy();
    // expect(email.pristine).toBeTruthy();
    expect(email.errors['required']).toBeTruthy();
    email.setValue('');

    //expect(email.errors['email']).toBeTruthy();
  });

  it('[Email-check] - should check the entered email address is valid', () => {
    let email = component.form.controls['email'];
    email.setValue('abc@gmail.com');
    expect(email.errors).toBeNull();
  });

  it('[Name-check] - should check the name is invalid', () => {
    let name = component.form.controls['name'];
    expect(name.errors['required']).toBeTruthy();
    // name.setValue('abc');
    // expect(name.errors['minlength']).toBeTruthy();
  });

  it('[Name-check] - should check the entered name is valid', () => {
    let name = component.form.controls['name'];
    name.setValue('abcdefg');
    expect(name.errors).toBeNull();
  });

  it('[Dateofbirth-check] - should check the dateofbirth is entered or not', () => {
    let dateofbirth = component.form.controls['dateofbirth'];
    expect(dateofbirth.errors['required']).toBeTruthy();
  });

  it('[Dateofbirth-check] - should check the entered dateofbirth is valid', () => {
    let dateofbirth = component.form.controls['dateofbirth'];
    dateofbirth.setValue('1994-02-14T18:30:00.000Z');
    expect(dateofbirth.errors).toBeNull();
  });

  it('[Form-check] - should check the form is valid or not if no values entered', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('[Form-check] - should check the form is valid or not when values entered', () => {
    component.form.controls['email'].setValue('abc@gmail.com');
    component.form.controls['name'].setValue('abcdef');
    component.form.controls['dateofbirth'].setValue('1994-02-14T18:30:00.000Z');
    expect(component.form.valid).toBeTruthy();
  });

  // it('should add the indicated student', () => {
  //   //studentService.onButtonClick.and.returnValue(of(true));
  //   //component.view1 = STUDENTS;
  //   console.log("====student 0=====", STUDENTS[1].id);
  //   component.onButtonClick = () => {
  //     if (component.id === 0) {
  //       expect(STUDENTS).toEqual(STUDENTS);
  //     }
  //     else {
  //       expect(STUDENTS).toEqual(STUDENTS);
  //     }
  //   }

  // });



});
