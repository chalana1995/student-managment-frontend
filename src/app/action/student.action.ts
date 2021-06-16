import {Action} from '@ngrx/store';
import {Student} from '../model/student.model';
import {GridDataResult} from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';

export enum StudentActionTypes {
    ADD_STUDENT = '[STUDENT] Add Student',
    ADD_STUDENT_SUCCESS = '[STUDENT] Add Student Success',
    ADD_STUDENT_FAIL = '[STUDENT] Add Srudent Fail',
    
    GET_STUDENT = '[STUDENT] Get Student',
    GET_STUDENT_SUCCESS = '[STUDENT] Get Student Success',
    GET_STUDENT_FAIL = '[STUDENT] Get Student Fail',

    DELETE_STUDENT = '[STUDENT] Delete Student',
    DELETE_STUDENT_SUCCESS = '[STUDENT] Delete Student Success',
    DELETE_STUDENT_FAIL = '[STUDENT] Delete Student Fail',

    UPDATE_STUDENT = '[STUDENT] Update Student',
    UPDATE_STUDENT_SUCCESS = '[STUDENT] Update Student Success',
    UPDATE_STUDENT_FAIL = '[STUDENT] Update Student Fail',
}


/*
** Get Posts
**/
export class GetStudentsAction implements Action {
    readonly type = StudentActionTypes.GET_STUDENT;
    constructor(public payload: State){}
}

export class GetStudentsSuccessAction implements Action {
    readonly type = StudentActionTypes.GET_STUDENT_SUCCESS;
    constructor(public payload: GridDataResult){}
}

export class GetStudentsFailAction implements Action {
    readonly type = StudentActionTypes.GET_STUDENT_FAIL;
    constructor(public payload: any) {}
}

/*
** End - Get Posts
**/


/*
** Add Post
**/
export class AddStudentAction implements Action {
    readonly type = StudentActionTypes.ADD_STUDENT;
    constructor(public payload: Student){}
}

export class AddStudentSuccessAction implements Action {
    readonly type = StudentActionTypes.ADD_STUDENT_SUCCESS;
    constructor(public payload: Student){}
}

export class AddStudentFailAction implements Action {
    readonly type = StudentActionTypes.ADD_STUDENT_FAIL;
    constructor(public payload: any){}
}

/*
** End - Add Post
**/


/*
** Delete Post
**/
export class DeleteStudentAction implements Action {
    readonly type = StudentActionTypes.DELETE_STUDENT;
    constructor(public payload: number){}
}

export class DeleteStudentSuccessAction implements Action {
    readonly type = StudentActionTypes.DELETE_STUDENT_SUCCESS;
    constructor(public payload: number){}
}

export class DeleteStudentFailAction implements Action {
    readonly type = StudentActionTypes.DELETE_STUDENT_FAIL;
    constructor(public payload: any){}
}

/*
** End - Delete Student
**/

/*
** Update Student
**/
export class UpdateStudentAction implements Action {
    readonly type = StudentActionTypes.UPDATE_STUDENT;
    constructor(public id: any,public payload: Student){}
}

export class UpdateStudentSuccessAction implements Action {
    readonly type = StudentActionTypes.UPDATE_STUDENT_SUCCESS;
    constructor(public payload: any){}
}

export class UpdateStudentFailAction implements Action {
    readonly type = StudentActionTypes.UPDATE_STUDENT_FAIL;
    constructor(public payload: any){}
}

/*
** End - Update Student
**/

export type StudentAction = 
    DeleteStudentAction |
    DeleteStudentSuccessAction |
    DeleteStudentFailAction |
    GetStudentsAction | 
    GetStudentsSuccessAction | 
    GetStudentsFailAction | 
    AddStudentAction | 
    AddStudentSuccessAction | 
    AddStudentFailAction | 
    UpdateStudentAction | 
    UpdateStudentSuccessAction | 
    UpdateStudentFailAction;