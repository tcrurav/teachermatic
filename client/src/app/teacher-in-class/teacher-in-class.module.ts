import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TeacherInClassPage } from './teacher-in-class.page';

const routes: Routes = [
  {
    path: '',
    component: TeacherInClassPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TeacherInClassPage]
})
export class TeacherInClassPageModule {}
