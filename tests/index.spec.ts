import chai from 'chai';
import chaiHttp from 'chai-http';
import { apiTests } from './scenarios/api-tests.spec';
import { app } from '../index';
import { errorTests } from './scenarios/errors.spec';
import { usersTests } from './scenarios/users.spec';

chai.use(chaiHttp);
const expect = chai.expect;

describe('User APIs', () => {
    apiTests(expect,app);
});

describe('Bad cases', () => {
    errorTests(expect,app);
});

describe('Tests with users', () => {
    usersTests(expect,app);
});


