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

describe('delete Class Router', () => {
    let tk: any;
    let idCourse: any;
    let idTeacher: any;
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
        idTeacher = teacher._id;

        await CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'ENGLISH' }) as Course;
        idCourse = course._id;

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
        await ClassService.addClass('FFFC142', idCourse, idRoom, idTeacher, 'Bacsicc', startTime, endTime, 2);
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
    xit('KT can delete Class incase Have idClass && You are Admin', async () => {
        const res = await request(app).delete(`/class/${idClass}`)
        .set({ token: tk });

        assert.equal(res.status, 200);
    });
    xit('KT canNOT delete Class incase Have idClass && You are NOT Admin', async () => {
        const res = await request(app).delete(`/class/${idClass}`)
        .set({ token: 'tk' });

        assert.equal(res.status, 404);
    });
    xit('KT canNOT delete Class incase wrong idClass && You are Admin', async () => {
        const res = await request(app).delete(`/class/lasfnwassf`)
        .set({ token: tk });

        assert.equal(res.status, 404);
    });
    it('KT If delete the Class, Schedule Teacher, Schedule Room is removed, Student and course is Updated', async () => {
        const res = await request(app).delete(`/class/${idClass}`)
        .set({ token: tk });
        const countScheduleRoom = await ScheduleRoom.count({});
        const countScheduleTeacher = await ScheduleTeacher.count({});
        const course = await Course.findById(idCourse) as Course;
        const countClassInCourse = course.listClass.length;
        const student = await Student.findById(idStudent) as Student;
        const countClassInStudent = course.listClass.length;

        assert.equal(countScheduleTeacher, 0);
        assert.equal(countScheduleRoom, 0);
        assert.equal(countClassInStudent, 0);
        assert.equal(countScheduleTeacher, 0);
        assert.equal(res.status, 200);
    });
});