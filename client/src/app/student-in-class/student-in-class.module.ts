import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StudentInClassPage } from './student-in-class.page';

const routes: Routes = [
  {
    path: '',
    component: StudentInClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StudentInClassPage]
})
export class StudentInClassPageModule {}
