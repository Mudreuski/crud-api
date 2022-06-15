import chai from 'chai';
import  http  from "http";

export function apiTests(expect: Chai.ExpectStatic, server:http.Server): void {
    let userId: string;

    it('Should return empty list', done => {
        chai
            .request(server)
            .get('/api/users')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.equals('[]');

                done();
            });
    });

    it('Should create user', done => {
        chai
            .request(server)
            .post('/api/users')
            .send({
                username: 'newUser',
                age: 42,
                hobbies: [],
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(JSON.parse(res.text).username).to.equal('newUser');
                userId = JSON.parse(res.text).id;

                done();
            });
    });

    it('Should return user by id', done => {
        chai
            .request(server)
            .get('/api/users/' + userId)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).username).to.equal('newUser');

                done();
            });
    });
    it('Should update user', (done) => {
        chai
            .request(server)
            .put('/api/users/' + userId)
            .send({
                username: 'Updated name',
                age: 24,
                hobbies: ['New hobby'],
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.stringify(JSON.parse(res.text).hobbies)).to.equal(
                    JSON.stringify(['New hobby'])
                );

                done();
            });
    });
    it('Should delete user', done => {
        chai
            .request(server)
            .delete('/api/users/' + userId)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(204);

                done();
            });
    });
    it('Should return 404 code', (done) => {
        chai
            .request(server)
            .get('/api/users/' + userId)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(404);

                done();
            });
    });
}
