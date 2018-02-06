import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Course } from '../../../src/models/Course';
import { Room } from '../../../src/models/Room';
import { ScheduleRoom } from '../../../src/models/ScheduleRoom';
import { ScheduleTeacher } from '../../../src/models/ScheduleTeacher';
import { AdminService } from '../../../src/service/admin.service';
import { ClassService } from '../../../src/service/class.service';
import { CourseService } from '../../../src/service/course.service';
import { RoomService } from '../../../src/service/room.service';
import { ScheduleRoomService } from '../../../src/service/scheduleRoom.service';
import { ScheduleTeacherService } from '../../../src/service/scheduleTeacher.service';
import { TeacherService } from '../../../src/service/teacher.service';

describe('add Class Router', () => {
    let tk: any;
    let idCourse: any;
    let idTeacher: any;
    let idRoom: any;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new a Room', async () => {
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

        // Add Schedule Teacher
        // let startTime1;
        // startTime1 = new Date();
        // let endTime1;
        // endTime1 = new Date();

        // startTime1.setUTCHours(18);
        // startTime1.setUTCMinutes(0);
        // endTime1.setUTCHours(19);
        // endTime1.setUTCMinutes(0);
        // await ScheduleTeacherService.addScheduleTeacher(idTeacher, startTime1, endTime1, 7);

        // Add Schedule Room
        let startTime2;
        startTime2 = new Date();
        let endTime2;
        endTime2 = new Date();

        startTime2.setUTCHours(18);
        startTime2.setUTCMinutes(0);
        endTime2.setUTCHours(19);
        endTime2.setUTCMinutes(0);
        await ScheduleRoomService.addScheduleRoom(3, startTime2, endTime2, idRoom);
    });
    xit('KT can add new a Class incase full infor && you are Admin && teacher - room empty', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const body = {
            name: 'FRC333',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Basic',
            startTime,
            endTime,
            dayOfWeek: 7
        };
        const response = await request(app).post('/class/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });

    xit('KT can add new a Class incase full infor && you are Admin && teacher not busy', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(21);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);

        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'High',
            startTime,
            endTime,
            dayOfWeek: 7
        };
        const response = await request(app).post('/class/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    xit('KT can add new a Class incase full infor && you are Admin && teacher busy', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(15);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);

        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'High',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = await request(app).post('/class/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 404);
    });
    xit('KT canNOT add new a Class incase full infor && you are Admin && room busy', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(15);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);

        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Low',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = await request(app).post('/class/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 404);
    });
    xit('KT can add new a Class incase full infor && you are Admin && room NOT busy', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(23);
        endTime.setUTCMinutes(30);

        const body = {
            name: 'Thanh123',
            idCourse,
            idRoom,
            idTeacher,
            level: 'Low',
            startTime,
            endTime,
            dayOfWeek: 3
        };
        const response = await request(app).post('/class/')
        .send(body)
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
});