import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentComponent } from './student.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StudentReducer, StudentState } from '../reducer/student.reducer';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DeleteStudentAction } from '../action/student.action';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let STUDENTS;
  let studentService;
  let toastService: ToastrService;
  let store: Store<StudentState>;;
  let fixture: ComponentFixture<StudentComponent>;
  let httpClient: HttpClient;

  beforeEach( () => {
     TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('student', StudentReducer),
        ToastrModule.forRoot()
      ],
      declarations: [StudentComponent],
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
    fixture = TestBed.createComponent(StudentComponent);
    httpClient = TestBed.inject(HttpClient);

    component = fixture.componentInstance;
    fixture.detectChanges();
    STUDENTS = [
      { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
      { "id": 1, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
      { "id": 2, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
      { "id": 3, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
      { "id": 4, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
    ];

    studentService = jasmine.createSpyObj(['DeleteStudentAction']);

    // component = new StudentComponent(studentService, toastService, store);

  })

  it('should create StudentComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the indicated student', () => {
    //studentService.onDelete.and.returnValue(of(true));
    component.view1 = STUDENTS;
    console.log("====student 0=====", STUDENTS[1].id);
    component.onDelete(STUDENTS[1].id);
    console.log("Student array====",component.view1);
    expect(STUDENTS.length).toBe(5);
  });



});
