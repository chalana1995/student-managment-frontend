import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Student } from '../model/student.model';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { toODataString } from '@progress/kendo-data-query';


export abstract class NorthwindService extends BehaviorSubject<GridDataResult> {
  public baseUrl = environment.apiUrl;
  student: Student;
  public loading: boolean;
  private studentCount: number;

  constructor(
    private http: HttpClient,
    protected tableName: string
  ) {
    super(null);
  }

  getCountOfStudent() {
    return this.http.get(this.baseUrl + "getCount");
  }

  public fetchStudent(state: any): Observable<any> {
    const queryStr = `skip=${state.skip}&take=${state.take}&$count=true`;
    this.loading = true;
    return this.http
      .get(`${this.baseUrl}?${queryStr}`)
      
  }

  addStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(this.baseUrl + "add", student);
  }

  getStudentById(id: number) {
    return this.http.get<Student>(this.baseUrl + "getid/" + id);
  }

  updateStudent(id: number, student: Student) {
    return this.http.patch(this.baseUrl + `${id}/update`, student);
  }

  deleteStudent(id: number) {
    return this.http.delete(this.baseUrl + `delete/${id}`);
  }

  uploadFile(fileToUpload: File) {
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(this.baseUrl + "upload", formData);
  }
}

@Injectable({
  providedIn: 'root'
})
export class StudentService extends NorthwindService {
  constructor(http: HttpClient) {
    super(http, 'student')
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      let errorMessage = '';
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      window.alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}







