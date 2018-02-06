import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Teacher } from '../../../src/models/Teacher';
import { TeacherService } from '../../../src/service/teacher.service';

describe('Teacher signin Router', () => {
    beforeEach('Add new teacher', async () => {
        await TeacherService.signUpTeacher('tea1', '123', 'teacher1', 'tea@gmailcon', '123', 'En', 'GL', 'Agri', '1234',
         ['Toiec', 'Tofel'], '123');
    });
    it('KT can signin incase with username && password', async () => {
        const body = {
            username: 'tea1',
            password: '123',
        };
        const res = await request(app).post('/teacher/signin')
        .send(body);

        const teacher = await Teacher.findOne({ username: 'tea1' }) as Teacher;
        assert.equal(res.body.success, true);
        assert.equal(res.status, 200);
    });
});