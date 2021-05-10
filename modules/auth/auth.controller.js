const bcrypt = require('bcryptjs');
const UserModel = require('./user');
const jwt = require('jsonwebtoken');

const createUser = async ({ email, password, name }) => {

    const existedUser = await UserModel.findOne({ email });
    //console.log(existedUser);
    if (existedUser) throw new Error('Existed user');

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    console.log('oke1');
    const newUser = await UserModel 
        .create({ email,password: hashPassword,name });
    
    return newUser;
}

const login = async ({ email, password }) => {
    const existedUser = await UserModel.findOne({ email });
    //neu ko co .lean() => Query

    if (!existedUser) throw new Error('Not found user');

    const hashPassword = existedUser.password;

    const comparedPassword = bcrypt.compareSync(password, hashPassword);

    if (!comparedPassword) throw new Error('Password is wrong');

    //login success
    // mã hóa thông tin -> token
    const data = { userId: existedUser._id };

    //jwt sẽ dùng 1 thuật toán đễ mã hóa data vs private key va thoi gian het han doan ma hoa đó
    const token = jwt.sign(
        data,
        process.env.PRIVATE_KEY,
        { expiresIn: process.env.EXPIRE_TIME }
    );

    return { user: existedUser, token };
}


module.exports = {
    createUser,
    login
}