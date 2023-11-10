import { User } from '@prisma/client';
import prisma from '../../datastore/client';
import {
  createUser,
  getUserByEmail,
  getUserByUserName,
} from '../../services/users.service';

const user: User = {
  id: '1',
  name: 'mahmoud',
  username: 'MahmoudShakour',
  email: 'test@gmail.com',
  password: '123m456789',
  photo: 'photo',
  role: 'MEMBER',
  isActive: true,
  createdAt: new Date('2000-11-11'),
};

const userWithHashedPassword: User = {
  id: '1',
  name: 'mahmoud',
  username: 'MahmoudShakour',
  email: 'test@gmail.com',
  password: 'hashed',
  photo: 'photo',
  role: 'MEMBER',
  isActive: true,
  createdAt: new Date('2000-11-11'),
};

describe('getUserByEmail', () => {
  it('should return retrieved user from datbase', async () => {
    prisma.user.findFirst = jest.fn().mockResolvedValue(user);

    const got = await getUserByEmail('test@gmail.com');
    const expected = user;

    expect(expected).toEqual(got);
  });
});

describe('getUserByUserName', () => {
  it('should return retrieved user from datbase', async () => {
    prisma.user.findFirst = jest.fn().mockResolvedValue(user);

    const got = await getUserByUserName('MahmoudShakour');
    const expected = user;

    expect(expected).toEqual(got);
  });
});

describe('createUser', () => {
  it('should return created user with hashed password', async () => {
    prisma.user.create = jest.fn().mockResolvedValue(userWithHashedPassword);

    const got = await createUser('test@gmail.com', 'mahmoud', 'MahmoudShakour', '123m456789');
    const expected = userWithHashedPassword;

    expect(got).toEqual(expected);
  });
});

