import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestApiTeachermaticService } from '../rest-api-teachermatic.service';
import { formatTo3Zeros } from '../utils/formatTo3Zeros';
import { Socket } from 'ngx-socket-io';
import { Classroom } from '../models/classroom';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-teacher-in-class',
  templateUrl: './teacher-in-class.page.html',
  styleUrls: ['./teacher-in-class.page.scss'],
})
export class TeacherInClassPage implements OnInit {
  classroomId: string;
  attendingTo: number = 0;
  attendingToFormatted: string = '000';
  studentsWaiting: number = 0;
  studentBeingAttended: string = null;
  classroomName: string;
  loaderToShow: any;

  constructor(private route: ActivatedRoute,
    private api: RestApiTeachermaticService,
    private socket: Socket,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.classroomId = this.route.snapshot.paramMap.get('classroomId');

    this.connectWebSocket();
  }

  loadTeacherData(classroom: Classroom) {
        console.log(classroom);
        this.classroomName = classroom.classroomName;
        this.attendingTo = classroom.ticketBeingAttended;
        this.attendingToFormatted = formatTo3Zeros(this.attendingTo);
        this.studentsWaiting = classroom.lastTicketAssigned - classroom.ticketBeingAttended;
        if(this.attendingTo > 0){
          this.studentBeingAttended = 
            classroom.students.filter( x => x.ticket == this.attendingTo)[0].name;
        }
  }

  connectWebSocket(){
    this.socket.connect();

    this.socket.fromEvent('classroom-changed').subscribe(() => {
      this.showLoader();
      this.api.getClassroomById(this.classroomId).subscribe( (classroom: Classroom) => {
        this.loadTeacherData(classroom);
        this.hideLoader();
      }, (err: any) => {
        console.log(err);
        this.hideLoader();
        this.presentAlert("Connection error!", "", "Check your Internet Connection. Or maybe the server is down. Try it later!");
      });
      
    });

  }

  attendNextStudent(){
    this.showLoader();
    this.api.attendNextStudent(this.classroomId)
      .subscribe((data: any) => {
        this.hideLoader();
        this.socket.emit('attended-next-student');
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
