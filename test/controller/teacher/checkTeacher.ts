import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Teacher } from '../../../src/models/Teacher';
import { TeacherService } from '../../../src/service/teacher.service';

describe('teacher checkUser Router', () => {
    let tk: any;
    beforeEach('Add new teacher', async () => {
        await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
         ['Toiec', 'Tofel'], '123');
        const data = await TeacherService.signInTeacher('tea1', '123');
        tk = data.token;
    });

    it('KT can signin incase token', async () => {
        const res = await request(app).post('/teacher/checkteacher')
        .set({ token: tk });
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });

    it('KT cannot signin incase token invalid', async () => {
        const res = await request(app).post('/teacher/checkteacher')
        .set({ token: 'asdfsfasfdmasfw' });
        assert.equal(res.body.success, false);
        assert.equal(res.status, 404);
    });
});