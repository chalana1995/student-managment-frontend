import { Component, OnInit } from '@angular/core';
import { DataStateChangeEvent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from '../service/student.service';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FileRestrictions } from '@progress/kendo-angular-upload';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';
import { Store } from '@ngrx/store';
import { DeleteStudentAction, GetStudentsAction } from '../action/student.action';

import AppState from '../model/app-state.model';
import { Student } from '../model/student.model';
import { getDeleteStudentSuccessSelector, getStudentErrorSelector, getStudentSelector, StudentState } from '../reducer/student.reducer';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: any[] = [];
  public gridView: GridDataResult;
  public pageSize = 5;
  public skip = 0;
  private data: Object[];

  fileToUpload: File = null;
  uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public myRestrictions: FileRestrictions = {
    allowedExtensions: ['xlsx']
  };

  public fileData: File;

  public form: FormGroup;
  public submitted = false;
  public view: Observable<GridDataResult>;
  public view1: GridDataResult;

  public state: State = {
    skip: 0,
    take: 5
  };

  public delId: number

  students$: Observable<Student[]>;
  error$: Observable<Error>;

  public studentCount: any;

  constructor(private studentservice: StudentService, private toastr: ToastrService, private store: Store<StudentState>) {

    this.view = studentservice;
    this.store.dispatch(new GetStudentsAction(this.state));
  }

  ngOnInit(): void {

    this.getStudentCount();

    //this.setSelect(this.studentCount);


    this.store.select(getStudentErrorSelector).subscribe(error => {
      if (error) {
        this.showError("Action failed", 'error');
      }
    })

    this.form = new FormGroup({
      avatar: new FormControl(this.fileData, [Validators.required])
    });
  }

  setSelect(count: any) {
    this.store.select(getStudentSelector).subscribe(dto => {
      console.log("Reducer ===> ", dto);
      this.view1 = { data: dto, total: count }
    })
  }

  getStudentCount() {
    this.studentservice.getCountOfStudent()
      .subscribe((res) => {
        console.log("===== count of student====", res);
        this.studentCount = res;
        this.setSelect(this.studentCount);
      })
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  public save(value: any, valid: boolean): void {
    this.submitted = true;

    if (valid) {
      console.log(value.avatar[0].rawFile);
      this.fileData = value.avatar[0].rawFile;

      this.studentservice.uploadFile(this.fileData).subscribe(data => {
        // do something, if upload success
        console.log(data);
        this.showSuccess('Upload Successfully', 'Success');

      }, error => {
        console.log(error);
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.store.dispatch(new GetStudentsAction(state));
  }

  public dialogOpened = false;

  public close() {
    this.dialogOpened = false;
  }

  public open(id) {
    this.delId = id;
    this.dialogOpened = true;
  }

  public action(status) {
    if (status == 'yes') {
      this.onDelete(this.delId);
    } else {
      this.close();
    }
  }


   onDelete(id) {
     this.store.dispatch(new DeleteStudentAction(id));
     this.store.select(getDeleteStudentSuccessSelector).subscribe(success => {
      console.log("success delete ===> ", success);
      if (success) {
        //this.showSuccess("Action success", 'success');
        this.close();
        //this.store.dispatch(new GetStudentsAction(this.state));
      }
    })
  }

  showSuccess(message, type) {
    this.toastr.success(message, type);
  }

  showError(message, type) {
    this.toastr.error(message, type);
  }

  showInfo(message, type) {
    this.toastr.info(message, type);
  }

}
