import { Student } from './student';

export class Classroom {
    _id: string;
    classroomName: string;
    teacherName: string;
    ticketBeingAttended: number;
    lastTicketAssigned: number;
    students: Array<Student>;
}