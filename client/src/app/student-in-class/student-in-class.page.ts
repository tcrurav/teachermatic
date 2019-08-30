import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiTeachermaticService } from '../rest-api-teachermatic.service';
import { formatTo3Zeros } from '../utils/formatTo3Zeros';
import { Classroom } from '../models/classroom';
import { Socket } from 'ngx-socket-io';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-student-in-class',
  templateUrl: './student-in-class.page.html',
  styleUrls: ['./student-in-class.page.scss'],
})
export class StudentInClassPage implements OnInit {
  classroom: Classroom = null;
  classroomId: string;
  yourName: string;
  attendingTo: number = 0;
  attendingToFormatted: string = "000"
  yourTicket: number = 0;
  yourTicketFormatted: string = "000";
  messageForStudent: string = "";
  numberOfStudentsBeforeYou: number;
  loaderToShow: any;

  constructor(private route: ActivatedRoute,
    private api: RestApiTeachermaticService,
    private socket: Socket,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');
    this.yourName = this.route.snapshot.paramMap.get('yourName');
    
    this.socket.connect();

    this.socket.fromEvent('classroom-changed').subscribe(() => {
      this.showLoader();
      this.api.getClassroomById(this.classroomId).subscribe( (classroom: Classroom) => {
        this.loadStudentData(classroom);
        this.hideLoader();
      }, (err: any) => {
        console.log(err);
        this.hideLoader();
        this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
      });
      
    });
  }

  loadStudentData(classroom: Classroom) {
        this.classroom = classroom;
        this.attendingTo = classroom.ticketBeingAttended;
        this.attendingToFormatted = formatTo3Zeros(this.attendingTo);
        this.yourTicket = this.classroom.students
          .filter( x => x.name == this.yourName)[0].ticket;
        this.yourTicketFormatted = formatTo3Zeros(this.yourTicket);
        this.numberOfStudentsBeforeYou = this.yourTicket - this.attendingTo;

        if(this.numberOfStudentsBeforeYou == 1){
          this.messageForStudent = "Hey... You are the next one. You won't have to wait much longer!!!";
        } else if(this.numberOfStudentsBeforeYou == 0) {
          this.messageForStudent = "You are being attended right now. Congratulations!!!";
        } else {
          this.messageForStudent = this.numberOfStudentsBeforeYou + " students before you. Be patient!";
        }
  }

  requestTicket(){
    this.showLoader();
    this.api.requestTicket(this.classroomId, this.yourName)
      .subscribe((data: any) => {
        this.hideLoader();
        this.socket.emit('new-ticket-obtained');
      }, (err: any) => {
        console.log(err);
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
