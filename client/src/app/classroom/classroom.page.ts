import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestApiTeachermaticService } from '../rest-api-teachermatic.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.page.html',
  styleUrls: ['./classroom.page.scss'],
})
export class ClassroomPage implements OnInit {
  public role: string;

  classroomForm: FormGroup;
  submitAttempt: boolean = false;
  loaderToShow: any;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private api: RestApiTeachermaticService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role');

    this.classroomForm = this.formBuilder.group({
      classroomName: ['', [Validators.required, Validators.minLength(6)]]
    }, {});
  }

  onSubmit(value: any): void {
    this.submitAttempt = true;

    // Stop if the form validation has failed
    if (this.classroomForm.invalid) {
      return;
    }

    value.classroomName = value.classroomName.toUpperCase();

    this.showLoader();

    this.api.getClassroomByName(value.classroomName)
      .subscribe((data: any) => {
        console.log("data");
        this.hideLoader();
        if (this.role == 'student' && !data) {
          this.presentAlert("Classroom not found!", "", "The classroom name you typed in doesn't exist. Ask your teacher for the right name of your classroom.");
          return;
        } else if (this.role == 'teacher' && data) {
          this.presentAlert("Classroom already exist!", "", "The classroom name you typed in already exist. Choose other name for your classroom.");
          return;
        }
        this.goToYourNamePage(value.classroomName);
      }, (err: any) => {
        console.log(err);
        this.hideLoader();
        this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
      });
  }

  goToYourNamePage(classroomName: string) {
    let url = "/your-name/" + this.role + "/" + classroomName;
    this.router.navigateByUrl(url);
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
    console.log('hideLoader');
      this.loadingController.dismiss();
      console.log('hideLoader1');
  }
}
