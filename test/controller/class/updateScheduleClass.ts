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

describe('update Schedule for Class Router', () => {
    let tk: any;
    let idCourse1: any;
    let idTeacher1: any;
    let idRoom1: any;
    let idClass: any;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new 2 Room - Add Class', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        const teacher = await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
            ['Toiec', 'Tofel'], '123');
        idTeacher1 = teacher._id;

        await CourseService.addCourse('ENGLISH', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'ENGLISH' }) as Course;
        idCourse1 = course._id;

        await RoomService.addRoom('E102', 1000);
        const room1 = await Room.findOne({ name: 'E102' }) as Room;
        idRoom1 = room1._id;

        // Add class
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(19);
        endTime.setUTCMinutes(30);
        await ClassService.addClass('FFFC142', idCourse1, idRoom1, idTeacher1, 'Lowww', startTime, endTime, 2);
        const cl = await Class.findOne({ name: 'FFFC142' }) as Class;
        idClass = cl._id;

        // Add Schedule Room
        let startTime1;
        startTime1 = new Date();
        let endTime1;
        endTime1 = new Date();

        startTime1.setUTCHours(15);
        startTime1.setUTCMinutes(0);
        endTime1.setUTCHours(16);
        endTime1.setUTCMinutes(30);

        await ScheduleRoomService.addScheduleRoom(2, startTime1, endTime1, idRoom1);

    });
    xit('KT can update Schedule Class incase Have idClass - fulll new Data && You are Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 3,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = await request(app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });

        assert.equal(res.status, 200);
    });
    xit('KT canNOT update Schedule Class incase Have idClass - new Data && You are NOT Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 3,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = await request(app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: 'tk' });

        assert.equal(res.status, 404);
    });
    xit('KT canNOT update Schedule Class incase Have idClass - new Data && You are Admin && Room is busied', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(15);
        startTime.setUTCMinutes(30);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 2,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = await request(app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });

        assert.equal(res.status, 404);
    });
    it('KT can update Schedule Class incase Have idClass - new Data && You are Admin && Room is not busied', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(16);
        startTime.setUTCMinutes(35);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);
        const body = {
            newDayOfWeek: 2,
            newStartTime: startTime,
            newEndTime: endTime
        };
        const res = await request(app).put(`/class/updateScheduleClass/${idClass}`)
            .send(body)
            .set({ token: tk });

        assert.equal(res.status, 200);
    });
});