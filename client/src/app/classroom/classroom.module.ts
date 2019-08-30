import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ClassroomPage } from './classroom.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ClassroomPage]
})
export class ClassroomPageModule {}
