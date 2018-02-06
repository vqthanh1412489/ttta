import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Teacher } from '../../../src/models/Teacher';
import { AdminService } from '../../../src/service/admin.service';
import { ScheduleTeacherService } from '../../../src/service/scheduleTeacher.service';
import { TeacherService } from '../../../src/service/teacher.service';

describe('add ScheduleTeacher Router', () => {
    let tk: any;
    let idTeacher: any;
    beforeEach('Add new a Admin - Add new Teacher', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
         ['Toiec', 'Tofel'], '123');
        const teacher = await Teacher.findOne({ username: 'tea1' }) as Teacher;
        idTeacher = teacher._id;
    });
    it('KT can add new a ScheduleTeacher incase full infor && you are Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/scheduleTeacher/')
        .send({ idTeacher, startTime, endTime, dayOfWeek: 7 })
        .set({ token: tk });
        assert.equal(response.status, 200);
    });
    it('KT cannot add new a ScheduleTeacher incase you arenot Admin', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(19);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/scheduleTeacher/')
        .send({ idTeacher, startTime, endTime, dayOfWeek: 7 })
        .set({ token: 'tk' });
        assert.equal(response.status, 404);
    });

    it('KT cannot add new a ScheduleTeacher incase is Admin && invalid Teacher', async () => {
        let startTime;
        startTime = new Date();
        let endTime;
        endTime = new Date();

        startTime.setUTCHours(18);
        startTime.setUTCMinutes(0);
        endTime.setUTCHours(20);
        endTime.setUTCMinutes(30);
        const response = await request(app).post('/ScheduleTeacher/')
        .send({ idTeacher: 'kahsfslfjlalsfasfm', startTime, endTime, dayOfWeek: 7 })
        .set({ token: tk });
        assert.equal(response.status, 404);
    });
});