import * as assert from 'assert';
import * as request from 'supertest';
import { app } from '../../../src/app';
import { Admin } from '../../../src/models/Admin';

describe('get All Admin Router', () => {
    it('KT can get list Admin', async () => {
        const res = await request(app).get('/admin');
        console.log(res.body);
    });
});