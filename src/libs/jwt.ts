import { sign, verify } from 'jsonwebtoken';
const KEY = 'Thanh123';

export function createToken(obj: any) {
    return new Promise((resolve, reject) => {
        sign(obj, KEY, { expiresIn: '2 days' }, (err, token) => {
            if (err) return reject(err);
            resolve(token);
        });
    });
}

export function verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        verify(token, KEY, (err, obj) => {
            if (err) return reject(err);
            resolve(obj);
        });
    });
}