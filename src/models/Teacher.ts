import mongoose = require('mongoose');
import { model, Schema } from 'mongoose';

const TeacherSchema = new Schema({
    username: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    nationality: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    bank: { type: String, required: true, trim: true },
    bankAccountNumber: { type: String, required: true, trim: true },
    skill: { type: String, required: true, trim: true },
    image: { type: String, trim: true },
    dateSignUp: { type: Date, required: true, trim: true },
    note: { type: String, trim: true },
    authority: { type: Number, required: true } // 0: Admin - 1: Teacher - 2: Student
});

const TeacherMongo  = model('Teacher', TeacherSchema);

export class Teacher extends TeacherMongo {
    _id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    phone: string;
    nationality: string;
    address: string;
    bank: string;
    bankAccountNumber: string;
    skill: string;
    image: string;
    dateSignUp: Date;
    note: string;
    authority: number;
}