import { compare, hash } from 'bcrypt';
import { createToken, verifyToken } from '../libs/jwt';
import { Student } from '../models/Student';

export class StudentService {
    // Quyen Ad
    static async signUpStudent(
        username: string,
        password: string,
        name: string,
        email: string,
        address: string,
        phone: string,
        score: number,
        level: number
    ) {
        const encrypted = await hash(password, 8);
        const student = new Student({
            username, password: encrypted,
            name,
            email, address, phone,
            image: '',
            score: 0, level: 0,
            authority: 2
        });
        await student.save();
        return student;
    }

    // Quyen Student
    static async signInStudent(username: string, password: string) {
        const student = await Student.findOne({ username }) as Student;
        if (!student) throw new Error('User not exists');
        if (student.authority !== 2) throw new Error('You are not a student');
        const same = await compare(password, student.password);
        if (!same) throw new Error('Password invalid');
        const studentInfor = student.toObject() as Student;
        delete studentInfor.password;
        const token = await createToken({ _id: student._id, authority: student.authority });
        return { student: studentInfor, token };
    }

    static async checkStudent(token: string) {
        const { _id, authority } = await verifyToken(token);
        const student = await Student.findById(_id) as Student;
        if (!student) throw new Error('User not exists');
        if (student.authority !== 2) throw new Error('You are not student');
        const studentInfor = student.toObject() as Student;
        delete studentInfor.password;
        const newToken = await createToken({ _id: student._id, authority: student.authority });
        return { student: studentInfor, token: newToken };
    }
    // Can quyen Admin
    static async deteleStudent(idStudent: string) {
        const studentRemoved = await Student.findByIdAndRemove(idStudent) as Student;
        if (!studentRemoved) throw new Error('idStudent not found');
        const studentInfor = studentRemoved.toObject() as Student;
        delete studentInfor.password;
        return studentInfor;
    }

    // Student
    static async updatePasswordStudent(idStudent: string, newPassword: string) {
        const encrypted = await hash(newPassword, 8);
        const newStudent =  await Student.findByIdAndUpdate(idStudent, { password: encrypted }, { new: true }) as Student;
        if (!newStudent) throw new Error('idStudent not found');
        const studentInfor = newStudent.toObject() as Student;
        delete studentInfor.password;
        return studentInfor;
    }

    static async addClassToStudent(idStudent: string, idClass: string) {
        const newStudent = await Student.findByIdAndUpdate(idStudent, {
            $addToSet: {
                listClass: idClass
            }
        }, { new: true }) as Student;
        if (!newStudent) throw new Error('idStudent not found');
        return newStudent;
    }
    static async removeClassToStudent(idStudent: string, idClass: string) {
        const newStudent = await Student.findByIdAndUpdate(idStudent, {
            $pull: {
                listClass: idClass
            }
        }, { new: true }) as Student;
        if (!newStudent) throw new Error('idStudent not found');
        return newStudent;
    }
}