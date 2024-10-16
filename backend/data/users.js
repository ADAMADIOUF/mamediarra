import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin bally',
    email: 'boussobaly2025@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'adama Diouf',
    email: 'adamadiouf2017@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Debo Dioud',
    email: 'debo@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
]

export default users
