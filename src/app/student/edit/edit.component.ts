import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FileRestrictions, RemoveEvent, SelectEvent, UploadEvent } from '@progress/kendo-angular-upload';

import { Store } from '@ngrx/store';
import { AddStudentAction, UpdateStudentAction, UpdateStudentSuccessAction, AddStudentSuccessAction, GetStudentsAction } from '../../action/student.action';
import AppState from '../../model/app-state.model';
import { State } from '@progress/kendo-data-query';
import { getAddStudentSuccessSelector, getUpdateStudentSuccessSelector } from 'src/app/reducer/student.reducer';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: number;
  header: string;
  public form: FormGroup;
  public value: Date = new Date(2000, 2, 10);
  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  dob = new Date();

  public events: string[] = [];
  public imagePreviews: any[] = [];
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.xlsx']
  };

  public myForm: FormGroup;
  public myFiles: Array<any>;
  public submitted = false;

  fileToUpload: File = null;

  public userData: any = {
    id: 0,
    name: '',
    dateofbirth: '',
    email: '',
    age: 25
  };

  public state: State = {
    skip: 0,
    take: 5
  };

  

  constructor(private route: ActivatedRoute, private studentservice: StudentService, private router: Router, private toastr: ToastrService, private store: Store<AppState>) {
    this.form = new FormGroup({
      name: new FormControl(this.userData.name, [Validators.required]),
      dateofbirth: new FormControl(this.userData.dateofbirth, [Validators.required]),
      email: new FormControl(this.userData.email, [Validators.required]),
      age: new FormControl(this.userData.age, [Validators.required]),
    });
  }

  ngOnInit(): void {

    // this.getStudent();

    this.id = +this.route.snapshot.paramMap.get('id');
    this.header = this.id === 0 ? 'Add Student' : 'Edit Student';

    if (this.id != 0) {
      this.studentservice.getStudentById(this.id).subscribe(x => {
        this.userData = x;
        this.form = new FormGroup({
          name: new FormControl(x.name, [Validators.required]),
          dateofbirth: new FormControl(new Date(x.dateofbirth), [Validators.required]),
          email: new FormControl(x.email, [Validators.required,Validators.email]),
          age: new FormControl(x.age, [Validators.required]),
        });
      });
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.studentservice.uploadFile(this.fileToUpload).subscribe(data => {
      this.showSuccess('File Upload Succefully', 'success');
    }, err => {
      console.log(err);
      if (err.error.code == 404) {
        this.showInfo(err.error.message, 'Information');
        return;
      }
      this.showError('Failed to load', 'Error');
    });
  }

//, this.showSuccess('Student Added Succesfully', 'success')
  

  onButtonClick() {
    if (this.id === 0) {
      this.store.dispatch(new AddStudentAction(this.form.value));
      this.store.select(getAddStudentSuccessSelector).subscribe(success => {
        console.log("success ===> ", success);
          if(success)
          {
            //this.showSuccess("Action success", 'success');
            //this.store.dispatch(new GetStudentsAction(this.state));
          }                   
      })  
    }
    else {
      this.store.dispatch(new UpdateStudentAction (this.id, this.form.value));
      this.store.select(getUpdateStudentSuccessSelector).subscribe(success => {
        console.log("success update ===> ", success);
          if(success)
          {
            //this.showSuccess("Action success", 'success');
            //this.store.dispatch(new GetStudentsAction(this.state));
          }                   
      })
    }
    this.router.navigateByUrl('');
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
