import { Observable, ReplaySubject } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { StudentEffects } from './student.effect';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import {
    StudentActionTypes,
    DeleteStudentAction,
    DeleteStudentSuccessAction,
    DeleteStudentFailAction,
    GetStudentsAction,
    GetStudentsSuccessAction,
    GetStudentsFailAction,
    AddStudentAction,
    AddStudentSuccessAction,
    AddStudentFailAction,
    UpdateStudentAction,
    UpdateStudentSuccessAction,
    UpdateStudentFailAction
} from '../action/student.action';

import { TestScheduler } from 'rxjs/testing';
import { StudentService } from '.././service/student.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('PopAdminEffects', () => {
    const initialState = {
        students: [],
        error: "",
        success: ""
    };

    const studentService = jasmine.createSpyObj('studentService', [
        'fetchStudent',
        'addStudent',
        'updateStudent',
        'deleteStudent'
    ]);
    let effects: StudentEffects;
    let actions: ReplaySubject<any>;
    let store: MockStore<any>;
    let testScheduler;
    let popAdminFacadeSpy: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                StudentEffects,
                provideMockStore({ initialState }),
                provideMockActions(() => actions),
                { provide: StudentService, useValue: studentService },
                ToastrModule,
            ]
        });

        effects = TestBed.inject(StudentEffects);
        store = TestBed.inject(MockStore);
        store.setState({});

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });

});
