import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Class } from '../../../src/models/Class';
import { Course } from '../../../src/models/Course';
import { Room } from '../../../src/models/Room';
import { ScheduleRoom } from '../../../src/models/ScheduleRoom';
import { Student } from '../../../src/models/Student';
import { AdminService } from '../../../src/service/admin.service';
import { ClassService } from '../../../src/service/class.service';
import { CourseService } from '../../../src/service/course.service';
import { RoomService } from '../../../src/service/room.service';
import { ScheduleRoomService } from '../../../src/service/scheduleRoom.service';
import { StudentService } from '../../../src/service/student.service';
import { TeacherService } from '../../../src/service/teacher.service';

describe('update Class Router', () => {
    let tk: any;
    let idCourse1: any;
    let idCourse2: any;
    let idTeacher1: any;
    let idTeacher2: any;
    let idRoom: any;
    let idClass: any;
    let idStudent: any;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Room - Add Class - Add Studen to cLass', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        const teacher = await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
            ['Toiec', 'Tofel'], '123');
        idTeacher1 = teacher._id;
        const teacher2 = await TeacherService.signUpTeacher('tea2', '123', 'teacher2', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
            ['Toiec', 'Tofel'], '123');
        idTeacher2 = teacher2._id;

        await CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'ENGLISH' }) as Course;
        idCourse1 = course._id;
        await CourseService.addCourse('Franch', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course2 = await Course.findOne({ name: 'ENGLISH' }) as Course;
        idCourse2 = course2._id;

        await RoomService.addRoom('E102', 1000);
        const room = await Room.findOne({ name: 'E102' }) as Room;
        idRoom = room._id;

        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        await ClassService.addClass('FFFC142', idCourse1, idRoom, idTeacher1, 'Bacsicc', startTime, endTime, 2);
        const cl = await Class.findOne({ name: 'FFFC142' }) as Class;
        idClass = cl._id;

        await StudentService.signUpStudent(
            'student6', '123',
            'Student 6', 'std5@gmail.com',
            'Hoang dieu 2', '01698310295', 0, 0
        );
        const student = await Student.findOne({ username: 'student6' }) as Student;
        idStudent = student._id;

        await ClassService.addStudentToClass(idClass, idStudent);
    });
    it('KT can update Name_Level Class incase Have idClass && You are Admin', async () => {
        const body = {
            name: 'BBG221',
            level: 'High'
        };
        const res = await request(app).put(`/class/updateNameLevel/${idClass}`)
            .send(body)
            .set({ token: tk });

        assert.equal(res.status, 200);
    });
});