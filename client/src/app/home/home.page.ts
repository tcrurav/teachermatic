import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(private router: Router) {}

  // defaultSelectedRadio = "radio_teacher";
  // //Get value on ionChange on IonRadioGroup
  // selectedRadioGroup: any;
  // //Get value on ionSelect on IonRadio item
  
  // radio_list_roles = [
  //   {
  //     id: '1',
  //     name: 'radio_list_roles',
  //     value: 'teacher',
  //     text: 'Teacher',
  //     disabled: false,
  //     checked: false,
  //     color: 'primary'
  //   }, {
  //     id: '2',
  //     name: 'radio_list_roles',
  //     value: 'student',
  //     text: 'Student',
  //     disabled: false,
  //     checked: true,
  //     color: 'primary'
  //   }
  // ];

  // selectedRadioItem: any = this.radio_list_roles[1];
 
  // radioGroupChange(event) {
  //   console.log("radioGroupChange",event.detail);
  //   this.selectedRadioGroup = event.detail;
  // }
 
  // radioFocus() {
  //   console.log("radioFocus");
  // }
  // radioSelect(event) {
  //   console.log("radioSelect",event.detail);
  //   this.selectedRadioItem = event.detail;
  // }
  // radioBlur() {
  //   console.log("radioBlur");
  // }
  
  // goNext(){
  //   let url = "/classroom/" + this.selectedRadioItem.value;
  //   this.router.navigateByUrl(url);
  // }
}
