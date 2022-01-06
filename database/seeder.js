const faker = require('faker');
const Seeder = require('mysql-db-seed').Seeder;

const bcrypt = require('bcryptjs');

const config = require('../config/dbcreds.json');

const {
    host,
    user,
    password,
    database
} = config;

const seed = new Seeder(
  10, 
  host,
  user,
  password,
  database
);

(async () => {
  await seed.seed(
    30,
    'users', 
    {
        first_name: () => faker.name.firstName(),
        last_name: () => faker.name.lastName(),
        address: () => faker.address.streetAddress(),
        post_code: () => faker.address.zipCodeByState(),
        phone_no: () => faker.phone.phoneNumberFormat(),
        email: () => `${faker.internet.userName().toLocaleLowerCase()}@example.com`,
        user_name: () => faker.internet.userName(),
        password: bcrypt.hashSync('secret', 8),
    }
  )
  seed.exit();
  process.exit();
})();