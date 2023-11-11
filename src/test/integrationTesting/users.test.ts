import { app } from '../../app';
import prisma from '../../datastore/client';
import { ResponseMessage } from '../../enums/ResponseMessage.enum';
import { StatusCode } from '../../enums/statusCode.enum';
import { createUser, getUserByEmail, getUserByUserName } from '../../services/users.service';
import request from 'supertest';

let usersSnapshot;

beforeAll(async () => {
  usersSnapshot = await prisma.user.findMany();
});

beforeEach(async () => {
  await prisma.user.deleteMany();
});

afterAll(async () => {
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: usersSnapshot! });
});

const user = {
  name: 'mahmoud',
  username: 'MahmoudShakour',
  email: 'test@gmail.com',
  password: '123m456789',
};

describe('getUserByEmail', () => {
  it('should return null as database is empty', async () => {
    const got = await getUserByEmail(user.email);
    const expected = null;

    expect(expected).toEqual(got);
  });

  it('should return user object', async () => {
    await prisma.user.create({
      data: user,
    });
    const got = await getUserByEmail(user.email);
    const expected = user;

    expect(got).toMatchObject(expected!);
  });
});

describe('getUserByUserName', () => {
  it('should return retrieved user from database', async () => {
    await prisma.user.create({
      data: user,
    });
    const got = await getUserByUserName(user.username);
    const expected = user;

    expect(got).toMatchObject(expected);
  });
});

describe('createUser', () => {
  it('should return created user with hashed password', async () => {
    const got = await createUser(user.email, user.name, user.username, user.password);
    const expected = await prisma.user.findFirst({ where: { email: user.email } });

    console.log(got, expected);
    expect(got).toMatchObject(expected!);
  });
});

describe('/POST register', () => {
  it('should return 201 and get the created user', async () => {
    const got = await request(app).post('/api/v1/users/register').send(user);
    expect(got.status).toBe(StatusCode.HTTP_201_CREATED);
    expect(got.body.message).toMatch(ResponseMessage.USER_CREATED_SUCCESSFULLY);
    expect(got.body.data).toMatchObject({
      name: user.name,
      username: user.username,
      email: user.email,
    });
  });

  it('should return 409 as there is userName conflict', async () => {
    await prisma.user.create({ data: user });
    const got = await request(app).post('/api/v1/users/register').send({
      name: 'mahmoud',
      username: user.username,
      email: 'anotheremail@gmail.com',
      password: '123m456789',
    });
    expect(got.status).toBe(StatusCode.HTTP_409_CONFLICT);
    expect(got.body.message).toMatch(ResponseMessage.DUPLICATE_USERNAME);
  });

  it('should return 409 as there is email conflict', async () => {
    await prisma.user.create({ data: user });
    const got = await request(app).post('/api/v1/users/register').send({
      name: 'mahmoud',
      username: 'anotherUserName',
      email: user.email,
      password: '123m456789',
    });
    expect(got.status).toBe(StatusCode.HTTP_409_CONFLICT);
    expect(got.body.message).toMatch(ResponseMessage.DUPLICATE_EMAIL);
  });

  it('should return 400 as email format is not valid', async () => {
    const got = await request(app).post('/api/v1/users/register').send({
      name: user.name,
      username: user.email,
      email: 'test.gmail.com',
      password: user.password,
    });
    expect(got.status).toBe(StatusCode.HTTP_400_BAD_REQUEST);
  });
});

describe('/POST login', () => {
  it('should return 200 and the token for a successful signing in', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: user.email,
      password: user.password,
    });

    expect(got.status).toBe(StatusCode.HTTP_200_OK);
    expect(got.body.message).toMatch(ResponseMessage.SUCCESSFUL_LOGIN);
    expect(got.body.data).toHaveProperty('jwtToken');
  });

  it('should return 404 for the incorrect email', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: 'anotherEmail@gmail.com',
      password: user.password,
    });

    expect(got.status).toBe(StatusCode.HTTP_404_NOT_FOUND);
    expect(got.body.message).toMatch(ResponseMessage.USER_NOT_FOUND);
  });

  it('should return 401 for the incorrect password', async () => {
    await request(app).post('/api/v1/users/register').send(user);
    const got = await request(app).post('/api/v1/users/login').send({
      email: user.email,
      password: 'wrongPassword0',
    });

    expect(got.status).toBe(StatusCode.HTTP_401_UNAUTHORIZED);
    expect(got.body.message).toMatch(ResponseMessage.INVALID_PASSWORD);
  });
});
