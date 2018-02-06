import mongoose = require('mongoose');

import { model, Schema } from 'mongoose';

const AdminSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    birthDay: { type: Date, required: true, trim: true },
    image: { type: String, trim: true },
    dateSignUp: { type: Date, required: true, trim: true },
    authority: { type: Number, required: true }, // 0: Admin - 1: Teacher - 2: Student
});

const AdminMongo = model('Admin', AdminSchema);

export class Admin extends AdminMongo {
    username: string;
    password: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    birthDay: Date;
    image: string;
    dateSignUp: Date;
    authority: number;
}
