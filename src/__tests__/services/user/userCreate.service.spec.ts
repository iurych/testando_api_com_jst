import { DataSource } from 'typeorm';
import { AppDataSource } from '../../../data-source';
import userCreateService from '../../../services/user/userCreate.service';

describe('Create an user', () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error('Error during Data Source initialization', err);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test('Should insert the informations of the new user in the database', async () => {
    const email = 'patrick@mail.com';
    const name = 'name';
    const age = 20;

    const userData = { email, name, age };
    const newUser = await userCreateService(userData);

    expect(newUser).toEqual(
      expect.objectContaining({
        id: 1,
        email,
        name,
        age,
      })
    );
  });
});
