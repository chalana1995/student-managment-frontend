import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { doesNotReject } from 'assert';
import { State } from '@progress/kendo-data-query';
import { of } from 'rxjs';
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
import * as fromReducer from './student.reducer';
import { GridDataResult } from '@progress/kendo-angular-grid';


describe('ShowReducer', () => {
    describe('get all students', () => {
        it('getStudents', () => {
            let state1: State = {
                skip: 0,
                take: 5
            };
            const { initialState } = fromReducer;

            // const expected = {
            //     students: [
            //         { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
            //         // { "id": 1, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
            //         // { "id": 2, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
            //         // { "id": 3, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
            //         // { "id": 4, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
            //     ],
            //     error: "",
            //     success: ""
            // }

            const expected: GridDataResult = {
                data: [
                    { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
                    { "id": 1, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
                    { "id": 2, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
                    { "id": 3, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
                    { "id": 4, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
                ],
                total: 5
            };


            const action = new GetStudentsSuccessAction(expected);
            const state = fromReducer.StudentReducer(initialState, action);
            expect(state.students).toEqual(expected);
            //expect(state).not.toBe(initialState.students);

        })
    })

    describe('add students', () => {
        it('addStudents', () => {

            const addStudent: Student = { name: 'a', dateofbirth: 'a', email: 'a', age: null };

            const { initialState } = fromReducer;
            // const initialState = {
            //     students: [{ name: 'a', dateofbirth: 'a', email: 'a', age: 4 }],
            //     error: "",
            //     success: ""
            // }
            const action = new AddStudentSuccessAction(addStudent);

            const state = fromReducer.StudentReducer(initialState, action);

            expect(state.students).toEqual(addStudent);
            console.log("=======state add====",state.students);
            //expect(state).not.toBe(addStudent);

        })
    })

  
    describe('update success students', () => {
        it('updateSuccessStudents', () => {

            const updateStudent: Student = { name: 'a', dateofbirth: 'a', email: 'a', age: null };
            let id: 2;
            const { initialState } = fromReducer;
            // const initialState = {
            //     students: [{ name: 'a', dateofbirth: 'a', email: 'a', age: 4 }],
            //     error: "",
            //     success: ""
            // }
            const action = new UpdateStudentSuccessAction(updateStudent);

            const state = fromReducer.StudentReducer(initialState, action);

            expect(state.students).toEqual(updateStudent);
            console.log("=======state update====",state.students);
            //expect(state).not.toBe(addStudent);

        })
    })

    describe('delete students', () => {
        it('deleteStudents', () => {

            // const mockResult = [
            //     {
            //         id: 1,
            //         name: "a",
            //         dateofbirth: "a",
            //         email: "a",
            //         age: 3
            //     },
            //     {
            //         id: 2,
            //         name: "b",
            //         dateofbirth: "b",
            //         email: "b",
            //         age: 3
            //     }
            // ];

            const { initialState } = fromReducer;
            // const mockResult = {
            //     students: [{id: 0, name: 'a', dateofbirth: 'a', email: 'a', age: 4 }, {id: 1, name: 'b', dateofbirth: 'b', email: 'b', age: 4 }],
            //     error: "",
            //     success: ""
            // }


            // const mockResult: GridDataResult = {
            //     data: [
            //         { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
            //         { "id": 1, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
            //         { "id": 2, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
            //         { "id": 3, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
            //         { "id": 4, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
            //     ],
            //     total: 5
            // };

            const mockResult1 = {
                students: [
                    { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
                    { "id": 4, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
                    { "id": 7, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
                    { "id": 10, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
                    { "id": 12, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
                ],
                error: "",
                success: ""
            }


            const action = new DeleteStudentSuccessAction(mockResult1.students[1].id);
            console.log("======= mockstudent====",mockResult1.students[1].id);
            // console.log("======= mockstudent 1111====",mockResult1.students.data[0].id);

            const state = fromReducer.StudentReducer(initialState, action);
            
            expect(state.students).toEqual(mockResult1.students[1].id);
            console.log("=======state 1111====",state.students);
            //expect(state).not.toBe(addStudent);

        })
    })
})