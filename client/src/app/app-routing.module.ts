import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'classroom/:role', loadChildren: './classroom/classroom.module#ClassroomPageModule' },
  { path: 'student-in-class/:classroomId/:yourName', loadChildren: './student-in-class/student-in-class.module#StudentInClassPageModule' },
  { path: 'your-name/:role/:classroomName', loadChildren: './your-name/your-name.module#YourNamePageModule' },
  { path: 'teacher-in-class/:classroomId', loadChildren: './teacher-in-class/teacher-in-class.module#TeacherInClassPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
