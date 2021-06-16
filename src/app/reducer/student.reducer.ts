import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentAction, StudentActionTypes } from '../action/student.action';
import { Student } from '../model/student.model';

export interface StudentState {
    students: Student[],
    error: string | any,
    success: string | any,
}

export const initialState: StudentState = {
    students: [],
    error: "",  
    success: ""
}

const getStudentFeatureState = createFeatureSelector<StudentState>('student');

export const getStudentSelector = createSelector(
    getStudentFeatureState,
    state => state.students

);

export const getStudentErrorSelector = createSelector(
    getStudentFeatureState,
    state => state.error
);

export const getUpdateStudentSuccessSelector = createSelector(
    getStudentFeatureState,
    state => state.success
);

export const getAddStudentSuccessSelector = createSelector(
    getStudentFeatureState,
    state => state.success
);

export const getDeleteStudentSuccessSelector = createSelector(
    getStudentFeatureState,
    state => state.success
);

export function StudentReducer(state: StudentState = initialState, action: StudentAction) {

    switch (action.type) {

        case StudentActionTypes.ADD_STUDENT:
            return {
                ...state,
            }
        case StudentActionTypes.ADD_STUDENT_SUCCESS:
            return {
                ...state,
                //students: [action.payload, ...state.students],
                students: action.payload,
                success: action.payload
            }
        case StudentActionTypes.ADD_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case StudentActionTypes.DELETE_STUDENT:
            return {
                ...state
            }
        case StudentActionTypes.DELETE_STUDENT_SUCCESS: {
            // let updatedStudents = [...state.students];
            // updatedStudents.splice(action.payload, 1);
            return {
                ...state,
                students: action.payload,
                success: action.payload
            };
        }
        case StudentActionTypes.DELETE_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case StudentActionTypes.GET_STUDENT:
            return {
                ...state,
            }
        case StudentActionTypes.GET_STUDENT_SUCCESS:
            return {
                ...state,
                students: action.payload,
            }
        case StudentActionTypes.GET_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        case StudentActionTypes.UPDATE_STUDENT:
            return {
                ...state,
            }
        case StudentActionTypes.UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                students: action.payload,
                success: action.payload
            }
        case StudentActionTypes.UPDATE_STUDENT_FAIL:
            return {
                ...state,
                error: action.payload,
            }
        default:
            return state;
    }
}