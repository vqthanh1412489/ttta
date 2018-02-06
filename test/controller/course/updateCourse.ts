import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Course } from '../../../src/models/Course';
import { AdminService } from '../../../src/service/admin.service';
import { CourseService } from '../../../src/service/course.service';

describe('update scheduleRoom Router', () => {
    let tk: any;
    let idCourse: any;
    beforeEach('Add new a Admin - Add new Course', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await CourseService.addCourse('BBG357', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'BBG357' }) as Course;
        idCourse = course._id;
    });
    xit('KT can Update Course incase Admin && idCourse', async () => {
        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate: new Date('2018-01-25'),
            endDate: new Date('2018-05-14'),
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const res = await request(app).put(`/course/${idCourse}`)
        .send(body)
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot Update Course incase not Admin && idScheduleRoom', async () => {
        const body = {
            name: 'FEC357',
            numberSession: 12,
            startDate: new Date('2018-01-25'),
            endDate: new Date('2018-05-14'),
            tuition: 5000000,
            detailInfor: 'Basic Englist'
        };
        const res = await request(app).put(`/scheduleRoom/${idCourse}`)
        .send(body)
        .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    });
});