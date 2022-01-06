const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();

chai.use(chaiHttp);

const host = 'http://localhost:3001';

const user = {
    first_name: 'Juan',
    last_name: 'Dela Cruz',
    email: 'juan@delacruz.com',
    password: 'secret',
};

let token = null;

describe('Users /api/users', () => {
    /**
     * Test /GET api/users
     */
         describe('/GET api/users', () => {
            it('it should get users', (done) => {
                chai.request(host)
                    .get('/api/users')
                    .auth(token, { type: 'bearer' })
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        done();
                    });
            });
        });

    /**
     * Test /POST api/users
     */
    describe('/POST api/users', () => {
        it('it should add user', (done) => {
            chai.request(host)
                .post('/api/users')
                .auth(token, { type: 'bearer' })
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /**
     * Test /POST api/users
     */
         describe('/PUT api/users/:id', () => {
            it('it should update user', (done) => {
                chai.request(host)
                    .put('/api/users/1')
                    .auth(token, { type: 'bearer' })
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });

    /**
     * Test /DELETE api/users/:id
     */
    describe('/DELETE api/users/:id', () => {
        it('it should delete user', (done) => {
            chai.request(host)
                .delete(`/api/users/1`)
                .auth(token, { type: 'bearer' })
                .send(user)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    /**
     * Test /GET api/users
     */
    describe('/DELETE api/users', () => {
        it('it should delete users', (done) => {
            chai.request(host)
                    .delete('/api/users')
                    .auth(token, { type: 'bearer' })
                    .send([1, 2])
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        done();
                    });
        });
    });
});
