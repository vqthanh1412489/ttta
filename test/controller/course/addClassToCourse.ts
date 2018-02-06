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

describe.only('add Class into Course Router', () => {
    let tk: any;
    let idCourse: any;
    let idTeacher: any;
    let idRoom: any;
    let idClass: any;
    beforeEach('Add new a Admin - new a Teacher - new a Course - new Room - Add Class', async () => {
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
        await ClassService.addClass('FFFC5', idCourse, idRoom, idTeacher, 'Bacsicc', startTime, endTime, 2);
        const cl = await Class.findOne({ name: 'FFFC5' }) as Class;
        idClass = cl._id;
    });
    it('KT can add Class into Course incase Have idCourse, idClass && you are Admin', async () => {
        const response = await request(app).put(`/course/addClassToCourse/${idCourse}`)
        .send({ idClass })
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    xit('KT cannot add Class into Course incase Have idCourse, idClass && you are not Admin', async () => {
        const response = await request(app).put(`/course/addClassToCourse/${idCourse}`)
        .send({ idClass })
        .set({ token: 'sfsfsf' });
        assert.equal(response.status, 404);
    });
    xit('KT canot add Class into Course incase duplicate idClass', async () => {
        const response = await request(app).put(`/course/addClassToCourse/${idCourse}`)
        .send({ idClass })
        .set({ token: tk });
        const response1 = await request(app).put(`/course/addClassToCourse/${idCourse}`)
        .send({ idClass })
        .set({ token: tk });
        assert.equal(response.status, 200);
        assert.equal(response1.status, 200);
        const course = await Course.findOne({ name: 'ENGLISH' }) as Course;
        assert.equal(course.listClass.length, 1);
    });
});