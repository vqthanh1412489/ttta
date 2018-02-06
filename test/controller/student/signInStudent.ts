import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Student } from '../../../src/models/Student';
import { AdminService } from '../../../src/service/admin.service';
import { StudentService } from '../../../src/service/student.service';

describe('Student signin Router', () => {
    beforeEach('Add a new Student', async () => {
        await StudentService.signUpStudent(
            'student2', '123',
            'Student 2', 'std2@gmail.com',
            '227 LVC', '01698310295', 0, 0
        );
    });
    it('KT can signin incase have username && password', async () => {
        const body = { username: 'student2', password: '123' };
        const res = await request(app).post('/student/signin')
        .send(body);

        assert.equal(res.status, 200);
    });
    it('KT cannot signin incase wrong username', async () => {
        const body = { username: 'student2ST', password: '123' };
        const res = await request(app).post('/student/signin')
        .send(body);

        assert.equal(res.status, 404);
    });
    it('KT cannot signin incase wrong password', async () => {
        const body = { username: 'student2', password: '123456' };
        const res = await request(app).post('/student/signin')
        .send(body);

        assert.equal(res.status, 404);
    });
});