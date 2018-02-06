import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Student } from '../../../src/models/Student';
import { AdminService } from '../../../src/service/admin.service';
import { StudentService } from '../../../src/service/student.service';

describe('Student delete Router', () => {
    let tk: any;
    let idStudent: any;
    beforeEach('Add a new Admin - Student', async () => {
        const birthDay = new Date('1995-09-30');
        await AdminService.signUpAdmin('vqt1', '123', 'Thanh1', 'vqt1@gmail.com', '01698310295', '5/22 Le Van Chi', birthDay);
        const data = await AdminService.signInAdmin('vqt1', '123');
        tk = data.token;

        await StudentService.signUpStudent(
            'student3', '123',
            'Student 3', 'std2@gmail.com',
            '227 NHCanh', '01698310295', 0, 0
        );

        const student = await Student.findOne({ username: 'student3' }) as Student;
        idStudent = student._id;
    });
    xit('KT can delete the Student incase idStudent && is Admin', async () => {
        const res = await request(app).delete(`/student/${idStudent}`)
        .set({ token: tk });

        assert.equal(res.status, 200);
    });
    it('KT cannot delete the Student incase idStudent && is not Admin', async () => {
        const res = await request(app).delete(`/student/${idStudent}`)
        .set({ token: 'sfsaf.lajfsf.asfwT%lajf' });

        assert.equal(res.status, 404);
    });
    it('KT cannot delete the Student incase idStudent && is not Admin', async () => {
        const res = await request(app).delete(`/student/${idStudent}`)
        .set({ token: 'sfsaf.lajfsf.asfwT%lajf' });

        assert.equal(res.status, 404);
    });
});