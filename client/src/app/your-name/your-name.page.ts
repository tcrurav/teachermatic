import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { RestApiTeachermaticService } from '../rest-api-teachermatic.service';
import { Classroom } from '../models/classroom';
import { Student } from '../models/student';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-your-name',
  templateUrl: './your-name.page.html',
  styleUrls: ['./your-name.page.scss'],
})
export class YourNamePage implements OnInit {
  role: string;
  classroomName: string;
  
  yourNameForm: FormGroup;
  submitAttempt: boolean = false;
  loaderToShow: any;

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private formBuilder: FormBuilder,
    private api: RestApiTeachermaticService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role');
    this.classroomName = this.route.snapshot.paramMap.get('classroomName');

    this.yourNameForm = this.formBuilder.group({
      yourName: ['', [Validators.required, Validators.minLength(6)]]
    }, {});
  }

  onSubmit(value: any): void {
    this.submitAttempt = true;

    // Stop if the form validation has failed
    if (this.yourNameForm.invalid) {
      return;
    }

    value.yourName = value.yourName.toUpperCase();

    console.log(value);

    let url: string;
    
    if(this.role == "student"){
      this.addStudentToClassroom(value);
    } else {
      this.addClassroom(value);
    } 
  }

  addStudentToClassroom(value: any) {
    this.showLoader();
    this.api.getClassroomByName(this.classroomName)
      .subscribe((data: any) => {
        if(!data._id){
          this.presentAlert("Classroom not found!", "", "Maybe your teacher has deleted the classroom.");
          return;
        } 
        //console.log(data);
        const classroomId = data._id;
        const s: Student = { 
          name: value.yourName,
          ticket: 0,
        };
        //console.log(s);
        this.api.addStudentToClassroom(classroomId, s)
          .subscribe((res: any) => {
            this.hideLoader();
            const id = res._id;
            const url = "/student-in-class/" + id + '/' + value.yourName;
            this.router.navigateByUrl(url);
          }, (err: any) => {
            //console.log(err);
            this.hideLoader();
            this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
          });
      }, (err: any) => {
        //console.log(err);
        this.hideLoader();
        this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
      });
  }

  addClassroom(value: any) {
    const cr: Classroom = { 
      _id: '',
      classroomName: this.classroomName,
      teacherName: value.yourName,
      ticketBeingAttended: 0,
      lastTicketAssigned: 0,
      students: []
    };
    //console.log(cr);
    this.showLoader();
    this.api.addClassroom(cr)
      .subscribe((res: any) => {
        this.hideLoader();
        const id = res._id;
        const url = `/teacher-in-class/${id}`;
        this.router.navigateByUrl(url);
      }, (err: any) => {
        //console.log(err);
        this.hideLoader();
        this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
      });
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'loading...'
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
  }

  hideLoader() {
      this.loadingController.dismiss();
  }
}
