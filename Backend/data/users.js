import bcrypt from 'bcryptjs';

const users = [{
    name: "Admin User",
    email: "Admin@email.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin: true,
},
{
    name: "Captain Jack",
    email: "jackspparow@email.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin: false,
},
{
    name: "Harvey",
    email: "Harvey@email.com",
    password: bcrypt.hashSync('123456',10),
    isAdmin: false,
},   
];
export default users;