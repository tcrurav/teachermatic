import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { Student } from './models/student';
import { Classroom } from './models/classroom';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'https://teachermatic.herokuapp.com:3000';

@Injectable({
  providedIn: 'root'
})
export class RestApiTeachermaticService {

  constructor(private http: HttpClient) { }

  // getStudents(): Observable<Student[]> {
  //   return this.http.get<Student[]>(apiUrl)
  //     .pipe(
  //       tap(student => console.log('fetched students')),
  //       catchError(this.handleError('getStudents', []))
  //     );
  // }
  
  // getStudent(id: any): Observable<Student> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.get<Student>(url).pipe(
  //     tap(_ => console.log(`fetched Student id=${id}`)),
  //     catchError(this.handleError<Student>(`getStudent id=${id}`))
  //   );
  // }
  
  // addStudent(Student: Student): Observable<Student> {
  //   return this.http.post<Student>(apiUrl, Student, httpOptions).pipe(
  //     tap((prod: Student) => console.log(`added Student w/ id=${prod._id}`)),
  //     catchError(this.handleError<Student>('addStudent'))
  //   );
  // }
  
  // updateStudent(id: any, Student: any): Observable<any> {
  //   const url = `${apiUrl}/${id}`;
  //   return this.http.put(url, Student, httpOptions).pipe(
  //     tap(_ => console.log(`updated Student id=${id}`)),
  //     catchError(this.handleError<any>('updateStudent'))
  //   );
  // }
  
  // deleteStudent(id: any): Observable<Student> {
  //   const url = `${apiUrl}/${id}`;
  
  //   return this.http.delete<Student>(url, httpOptions).pipe(
  //     tap(_ => console.log(`deleted Student id=${id}`)),
  //     catchError(this.handleError<Student>('deleteStudent'))
  //   );
  // }
  
  getClassrooms(): Observable<Classroom[]> {
    return this.http.get<Classroom[]>(apiUrl)
      .pipe(
        tap(_ => console.log('fetched Classrooms')),
        catchError(this.handleError('getClassrooms', []))
      );
  }
  
  getClassroomById(id: string): Observable<Classroom> {
    const url = `${apiUrl}/classrooms/byId/${id}`;
    return this.http.get<Classroom>(url).pipe(
      tap(_ => console.log(`fetched Classroom id=${id}`)),
      catchError(this.handleError<Classroom>(`getClassroom id=${id}`))
    );
  }

  getClassroomByName(name: string): Observable<Classroom> {
    const url = `${apiUrl}/classrooms/byName/${name}`;
    return this.http.get<Classroom>(url).pipe(
      tap(_ => console.log(`fetched Classroom name=${name}`)),
      catchError(this.handleError<Classroom>(`getClassroom name=${name}`))
    );
  }
  
  addClassroom(classroom: Classroom): Observable<Classroom> {
    return this.http.post<Classroom>(apiUrl + "/classrooms/create", classroom, httpOptions).pipe(
      tap(cr => console.log(`added Classroom w/ id=${cr._id}`)),
      catchError(this.handleError<Classroom>('addClassroom'))
    );
  }
  
  updateClassroom(id: any, classroom: Classroom): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, classroom, httpOptions).pipe(
      tap(_ => console.log(`updated Classroom id=${id}`)),
      catchError(this.handleError<any>('updateClassroom'))
    );
  }

  addStudentToClassroom(id: string, student: Student): Observable<any> {
    const url = `${apiUrl}/classrooms/${id}/addStudent`;
    return this.http.put(url, student, httpOptions).pipe(
      tap(_ => console.log(`updated Classroom id=${id}`)),
      catchError(this.handleError<any>('add Student to Classroom'))
    );
  }

  requestTicket(classroomId: string, studentName: string): Observable<any> {
    const url = `${apiUrl}/classrooms/${classroomId}/${studentName}/requestTicket`;
    return this.http.put(url, {}, httpOptions).pipe(
      tap(_ => console.log(`ticket obtained for Student ${studentName} in Classroom id=${classroomId}`)),
      catchError(this.handleError<any>('Request Ticket'))
    );
  }

  attendNextStudent(classroomId: string): Observable<any> {
    const url = `${apiUrl}/classrooms/${classroomId}/attendNextStudent`;
    return this.http.put(url, {}, httpOptions).pipe(
      tap(_ => console.log(`next student being attended in Classroom id=${classroomId}`)),
      catchError(this.handleError<any>('Attend next student'))
    );
  }
  
  deleteClassroom(id: any): Observable<Classroom> {
    const url = `${apiUrl}/${id}`;
  
    return this.http.delete<Classroom>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Classroom id=${id}`)),
      catchError(this.handleError<Classroom>('deleteClassroom'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

}
