import { Request } from 'express';

export interface IMyRequest extends Request {
    id: string;
}