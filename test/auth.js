const chai = require('chai');
const chaiHttp = require('chai-http');

const host = 'http://localhost:3001';

const should = chai.should();
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);

const user = {
    user_name: 'User',
    password: 'test',
};

// re-generate if expired
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY0MTQ2NzI3NywiZXhwIjoxNjQxNTUzNjc3fQ.Mgefdog_VSsNrb5PTpRpUYCh1EuszwbCgUyLHY5aoLk';

describe('Auth /api/auth', () => {

    describe('/POST api/auth/login', () => {
        it('it should login user', (done) => {
            chai.request(host)
                .post('/api/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('authenticated').eql(true);
                    res.body.should.have.property('token');
                    done();
                });
        });
    });

    describe('/POST api/auth/logout', () => {
        it('it should logout user', (done) => {
            chai.request(host)
                .post('/api/auth/logout')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('authenticated').eql(false);
                    res.body.should.have.property('token').eql(null);
                    done();
                });
        });
    });

    describe('/POST api/auth/me', () => {
        it('it should show user', (done) => {
            chai.request(host)
                    .get('/api/auth/me')
                    .auth(token, { type: 'bearer' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
        });
    });
});
