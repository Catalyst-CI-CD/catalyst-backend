import { app } from '../../app';
import prisma from '../../datastore/client';
import { ResponseMessage } from '../../enums/ResponseMessage.enum';
import { createUser, getUserByEmail, getUserByUserName } from '../../services/users.service';
const request = require('supertest');
beforeEach(async () => {
  await prisma.user.deleteMany();
});

const user = {
  name: 'mahmoud',
  username: 'MahmoudShakour',
  email: 'test@gmail.com',
  password: '123m456789',
};

describe('getUserByEmail', () => {
  it('should return null as database is empty', async () => {
    const got = await getUserByEmail('test@gmail.com');
    const expected = null;

    expect(expected).toEqual(got);
  });

  it('should return user object', async () => {
    await prisma.user.create({
      data: user,
    });
    const got = await getUserByEmail('test@gmail.com');
    const expected = user;

    expect(got).toMatchObject(expected!);
  });
});

describe('getUserByUserName', () => {
  it('should return retrieved user from datbase', async () => {
    await prisma.user.create({
      data: user,
    });
    const got = await getUserByUserName('MahmoudShakour');
    const expected = user;

    expect(got).toMatchObject(expected);
  });
});

describe('createUser', () => {
  it('should return created user with hashed password', async () => {
    const got = await createUser('test@gmail.com', 'mahmoud', 'MahmoudShakour', '123m456789');
    const expected = await prisma.user.findFirst({ where: { email: 'test@gmail.com' } });

    console.log(got, expected);
    expect(got).toMatchObject(expected!);
  });
});

describe('/POST register', () => {
  it('should return 201 and get the created user', async () => {
    const got = await request(app).post('/api/v1/users/register').send(user);
    expect(got.status).toBe(201);
    expect(got.body.message).toMatch(ResponseMessage.USER_CREATED_SUCCESSFULLY);
    expect(got.body.data).toMatchObject({
      name: 'mahmoud',
      username: 'MahmoudShakour',
      email: 'test@gmail.com',
    });
  });

  it('should return 409 as there is userName conflict', async () => {
    await prisma.user.create({ data: user });
    const got = await request(app).post('/api/v1/users/register').send({
      name: 'mahmoud',
      username: 'MahmoudShakour',
      email: 'test2@gmail.com',
      password: '123m456789',
    });
    expect(got.status).toBe(409);
    expect(got.body.message).toMatch(ResponseMessage.DUPLICATE_USERNAME);
  });

  it('should return 409 as there is email conflict', async () => {
    await prisma.user.create({ data: user });
    const got = await request(app).post('/api/v1/users/register').send({
      name: 'mahmoud',
      username: 'MahmoudShakourrr',
      email: 'test@gmail.com',
      password: '123m456789',
    });
    expect(got.status).toBe(409);
    expect(got.body.message).toMatch(ResponseMessage.DUPLICATE_EMAIL);
  });

  it('should return 400 as email format is not valid', async () => {
    const got = await request(app).post('/api/v1/users/register').send({
      name: 'mahmoud',
      username: 'MahmoudShakourrr',
      email: 'test.gmail.com',
      password: '123m456789',
    });
    expect(got.status).toBe(400);
  });
});

describe('/POST login', () => {
  it('should return 200 and the token for a succesful signing in', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: 'test@gmail.com',
      password: '123m456789',
    });

    expect(got.status).toBe(200);
    expect(got.body.message).toMatch(ResponseMessage.TOKEN_SENT_SUCCESSFULLY);
    expect(got.body.data).toHaveProperty('jwtToken');
  });

  it('should return 404 for the incorrect email', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: 'tes@gmail.com',
      password: '123m456789',
    });

    expect(got.status).toBe(404);
    expect(got.body.message).toMatch(ResponseMessage.USER_NOT_FOUND);
  });

  it('should return 401 for the incorrect password', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: 'test@gmail.com',
      password: '123m45678',
    });

    expect(got.status).toBe(401);
    expect(got.body.message).toMatch(ResponseMessage.INVALID_PASSWORD);
  });
});
