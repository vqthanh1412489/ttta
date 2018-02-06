import * as assert from 'assert';
import request = require('supertest');
import { app } from '../../../src/app';
import { Course } from '../../../src/models/Course';
import { AdminService } from '../../../src/service/admin.service';
import { CourseService } from '../../../src/service/course.service';

describe('delete course Router', () => {
    let tk: any;
    let idCourse: any;
    beforeEach('Add new a Admin - Add new Course', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await CourseService.addCourse('BBG246', 50, new Date('2018-02-01'), new Date('2018-05-06'), 200000, 'detailInfor');
        const course = await Course.findOne({ name: 'BBG246' }) as Course;
        idCourse = course._id;
    });
    xit('KT can Delete ScheduleRoom incase Admin && idScheduleRoom', async () => {
        const res = await request(app).delete(`/course/${idCourse}`)
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot Delete ScheduleRoom incase not Admin && idScheduleRoom', async () => {
        const res = await request(app).delete(`/course/${idCourse}`)
        .set({ token: 'asdfsfica' });
        assert.equal(res.status, 404);
    });

});