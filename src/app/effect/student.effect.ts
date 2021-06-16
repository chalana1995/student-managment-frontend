import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
import { StudentService } from '../service/student.service';

@Injectable()
export class StudentEffects {

     getStudents$ =  createEffect(() => this.actions$
        .pipe(
            ofType<GetStudentsAction>(StudentActionTypes.GET_STUDENT),
            mergeMap(
                (data) => this.service.fetchStudent(data.payload)
                    .pipe(
                        map(data2 => {
                            return new GetStudentsSuccessAction(data2)
                        }),
                        catchError(error => of(new GetStudentsFailAction(error)))
                    ) 
            ),
        )
     );

    deleteStudent$=  createEffect(() => this.actions$
        .pipe(
            ofType<DeleteStudentAction>(StudentActionTypes.DELETE_STUDENT),
            mergeMap(
                (data) => this.service.deleteStudent(data.payload)
                    .pipe(
                        map(data2 => {
                            return new DeleteStudentSuccessAction(data.payload);
                        }),
                        catchError(error => of(new DeleteStudentFailAction(error)))
                    )
            ),
        )
    );

    addStudent$ =  createEffect(() => this.actions$
        .pipe(
            ofType<AddStudentAction>(StudentActionTypes.ADD_STUDENT),
            mergeMap(
                (data) => this.service.addStudent(data.payload)
                    .pipe(
                        map(success => {
                            return new AddStudentSuccessAction(success);
                        }),
                        catchError(error => of(new AddStudentFailAction(error)))
                    )
            ),
        )
    );

     updateStudent$ =  createEffect(() => this.actions$
        .pipe(
            ofType<UpdateStudentAction>(StudentActionTypes.UPDATE_STUDENT),
            mergeMap(
                (data) => this.service.updateStudent(data.id, data.payload)
                    .pipe(
                        map(data2 => {
                            return new UpdateStudentSuccessAction(data2)
                        }),
                        catchError(error => of(new UpdateStudentFailAction(error)))
                    )
            ),
        )
     );

    constructor(
        private actions$: Actions,
        private service: StudentService,
        private toastr: ToastrService
    ) { }

    showError(message, type) {
        this.toastr.error(message, type);
    } 
}