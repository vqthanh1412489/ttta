import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Student } from '../../../src/models/Student';
import { StudentService } from '../../../src/service/student.service';

describe('student/changePassword Router', () => {
    let tk: any;
    beforeEach('Add new a student', async () => {
        await StudentService.signUpStudent(
            'student4', '123',
            'Student 4', 'std4@gmail.com',
            '227 LTK', '01698310295', 0, 0
        );
        const res = await StudentService.signInStudent('student4', '123');
        tk = res.token;
    });

    it('KT can change Password student incase right token', async () => {
        const res = await request(app).put(`/student/changePassword`)
        .send({ newPassword: 'Yennhi123' })
        .set({ token: tk });
        assert.equal(res.status, 200);
    });
    it('KT cannot change Password student incase wrong token', async () => {
        const res = await request(app).put(`/student/changePassword`)
        .send({ newPassword: 'Yennhi123' })
        .set({ token: 'sfsf..sfljasf' });
        assert.equal(res.status, 404);
    });
    it('KT cannot change Password student incase right token && empty newPassword', async () => {
        const res = await request(app).put(`/student/changePassword`)
        .send({  })
        .set({ token: tk });
        assert.equal(res.status, 404);
    });

});