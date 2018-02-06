import { compare, hash } from 'bcrypt';
import { createToken, verifyToken } from '../libs/jwt';
import { Admin } from '../models/Admin';

export class AdminService {
    static async signUpAdmin(
        username: string,
        password: string,
        name: string,
        email: string,
        phone: string,
        address: string,
        birthDay: Date) {
            const encrypted = await hash(password, 8);
            const dateSignUp = new Date(Date.now());
            const admin = new Admin({
                username, password: encrypted, name, email, phone, address, birthDay, image: '', dateSignUp, authority: 0
            });
            await admin.save();
            const adminInfor = admin.toObject() as Admin;
            delete adminInfor.password;
            return adminInfor;
    }
    static async signInAdmin(username: string, password: string) {
        const admin = await Admin.findOne({ username }) as Admin;
        if (!admin) throw new Error('User not exists');
        if (admin.authority !== 0) throw new Error('You are not a Admin');
        const same = await compare(password, admin.password);
        if (!same) throw new Error('Password invalid');
        const adminInfor = admin.toObject() as Admin;
        delete adminInfor.password;
        const token = await createToken({ _id: admin._id, authority: admin.authority });
        return { admin: adminInfor, token };
    }

    static async checkUser(token: string) {
        const { _id, authority } = await verifyToken(token);
        const admin = await Admin.findById(_id) as Admin;
        if (!admin) throw new Error('User not exists');
        if (admin.authority !== 0) throw new Error('You are not Admin');
        const adminInfor = admin.toObject() as Admin;
        delete adminInfor.password;
        const newToken = await createToken({ _id: admin._id, authority: admin.authority });
        return { admin: adminInfor, token: newToken };
    }

    static async deleteAdmin(idAdmin: string) {
        const adminRemoved = await Admin.findByIdAndRemove(idAdmin) as Admin;
        if (!adminRemoved) throw new Error('idAdmin not found');
        const adminInfor = adminRemoved.toObject() as Admin;
        delete adminInfor.password;
        return adminInfor;
    }

    static async updatePasswordAdmin(idAdmin: string, newPassword: string) {
        const encrypted = await hash(newPassword, 8);
        const newAdmin =  await Admin.findByIdAndUpdate(idAdmin, { password: encrypted }, { new: true }) as Admin;
        if (!newAdmin) throw new Error('idAdmin not found');
        const adminInfor = newAdmin.toObject() as Admin;
        delete adminInfor.password;
        return adminInfor;
    }
    static async updateNameAdmin(idAdmin: string, newName: string) {
        const newAdmin =  await Admin.findByIdAndUpdate(idAdmin, { name: newName }, { new: true }) as Admin;
        if (!newAdmin) throw new Error('idAdmin not found');
        const adminInfor = newAdmin.toObject() as Admin;
        delete adminInfor.password;
        return adminInfor;
    }

    static async getAllAdmin() {
        const admins = await Admin.find({});
        return admins;
    }
}