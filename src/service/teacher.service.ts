import { compare, hash } from 'bcrypt';
import { createToken, verifyToken } from '../libs/jwt';
import { Teacher } from '../models/Teacher';

export class TeacherService {
    static async signUpTeacher(
        username: string,
        password: string,
        name: string,
        email: string,
        phone: string,
        nationality: string,
        address: string,
        bank: string,
        bankAccountNumber: string,
        skill: [string],
        note: string
        ) {
            const encrypted = await hash(password, 8);
            const dateSignUp = new Date(Date.now());
            const teacher = new Teacher({
                username,
                password: encrypted,
                name, email, phone, nationality, address,
                bank, bankAccountNumber,
                image: '',
                dateSignUp,
                note,
                skill,
                authority: 1
            });
            await teacher.save();
            const teacherInfor = teacher.toObject() as Teacher;
            delete teacherInfor.password;
            return teacherInfor;
    }

    static async signInTeacher(username: string, password: string) {
        const teacher = await Teacher.findOne({ username }) as Teacher;
        if (!teacher) throw new Error('User not exists');
        if (teacher.authority !== 1) throw new Error('You are not a Teacher');
        const same = await compare(password, teacher.password);
        if (!same) throw new Error('Password invalid');
        const teacherInfor = teacher.toObject() as Teacher;
        delete teacherInfor.password;
        const token = await createToken({ _id: teacher._id, authority: teacher.authority });
        return { teacher: teacherInfor, token };
    }

    static async checkTeacher(token: string) {
        const { _id, authority } = await verifyToken(token);
        const teacher = await Teacher.findById(_id) as Teacher;
        if (!teacher) throw new Error('User not exists');
        if (teacher.authority !== 1) throw new Error('You are not Teacher');
        const teacherInfor = teacher.toObject() as Teacher;
        delete teacherInfor.password;
        const newToken = await createToken({ _id: teacher._id, authority: teacher.authority });
        return { teacher: teacherInfor, token: newToken };
    }
}