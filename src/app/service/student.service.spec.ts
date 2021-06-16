import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpClientModule } from '@angular/common/http';

import { Student } from '../model/student.model';
import { StudentService } from './student.service';
import { doesNotReject } from 'assert';
import { State } from '@progress/kendo-data-query';
import { of } from 'rxjs';

describe('getStudents', () => {
    let httpClientSpy: { get: jasmine.Spy, patch: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };
    let studentService: StudentService;
    let httpMock: HttpTestingController;
    let httpClient: HttpClient;
    let state: State = {
        skip: 0,
        take: 5
    };
    let id: number;

    const expectedStudents = [
        { "id": 0, "name": "a", "dateofbirth": "a", "email": "a", "age": 3 },
        { "id": 1, "name": "b", "dateofbirth": "b", "email": "b", "age": 4 },
        { "id": 2, "name": "c", "dateofbirth": "c", "email": "c", "age": 5 },
        { "id": 3, "name": "d", "dateofbirth": "d", "email": "d", "age": 6 },
        { "id": 4, "name": "e", "dateofbirth": "e", "email": "e", "age": 7 }
    ];

    const updateStudent: Student = { name: 'a', dateofbirth: 'a', email: 'a', age: 6 };

    const addStudent: Student = { name: 'a', dateofbirth: 'a', email: 'a', age: null };

    const mockResult = [
        {
            id: 1,
            name: "a",
            dateofbirth: "a",
            email: "a",
            age: 3
        },
        {
            id: 2,
            name: "b",
            dateofbirth: "b",
            email: "b",
            age: 3
        }
    ];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [StudentService]
        });
        //studentService = TestBed.get(StudentService);
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'patch', 'post', 'delete']);
        studentService = new StudentService(httpClientSpy as any);

        httpClient = TestBed.inject(HttpClient);
    });

    it('should return correct students when call a function', (done: DoneFn) => {
        httpClientSpy.get.and.returnValue(of(expectedStudents));


        studentService.fetchStudent(state).subscribe(
            students => {
                expect(students).toEqual(expectedStudents);
                done();
            },
            done.fail
        );
        expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    });

    // it('should return an error when the server returns a 404', (done: DoneFn) => {
    //     const errorResponse = new HttpErrorResponse({
    //         error: 'test 404 error',
    //         status: 404, statusText: 'Not Found'
    //     });

    //     httpClientSpy.get.and.returnValue(of(errorResponse));

    //     studentService.fetchStudent(state).subscribe(
    //         //heroes => done.fail('expected an error, not heroes'),
    //         error => {
    //             expect(error.message).toContain('test 404 error');
    //             done();
    //         }
    //     );
    // });

    it('update correct students', (done: DoneFn) => {
        httpClientSpy.patch.and.returnValue(of(updateStudent));

        studentService.updateStudent(id, updateStudent).subscribe(
            students => {
                expect(students).toEqual(updateStudent, 'update students');
                done();
            },
            done.fail
        );
        expect(httpClientSpy.patch.calls.count()).toBe(1, 'one call');
    })

    it('add correct students', (done: DoneFn) => {
        httpClientSpy.post.and.returnValue(of(addStudent));

        studentService.addStudent(addStudent).subscribe(
            students => {
                expect(students).toEqual(addStudent, 'add students');
                done();
            },
            done.fail
        );
        expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
    })

    it('delete correct students', (done: DoneFn) => {
        httpClientSpy.delete.and.returnValue(of(mockResult[0].id));

        studentService.deleteStudent(mockResult[0].id).subscribe(
            stud => {
                expect(stud).toEqual(mockResult[0].id);
                done();
            },
            done.fail
        );
        expect(httpClientSpy.delete.calls.count()).toBe(1, 'one call');
    })
});


