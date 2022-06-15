import chai from "chai";
import  http  from "http";

export function errorTests(expect:Chai.ExpectStatic, server:http.Server): void {
    let userId: string;

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

    it('Should return 400 in GET method', done => {
        chai
            .request(server)
            .get('/api/users/some-wrong-value')
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it('Should return 400 in POST method', done => {
        chai
            .request(server)
            .post('/api/users')
            .send({
                username: 'some user',
                age: 42,
            })
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it('Should return 400 in PUT method', done => {
        chai
            .request(server)
            .put('/api/users/some-wrong-value')
            .send({
                username: "name",
                hobbies: [],
                age: 42,
            })
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it('Should return 400 in DELETE method', (done) => {
        chai
            .request(server)
            .delete('/api/users/some-wrong-value')
            .end((err, res) => {
                expect(res).to.have.status(400);

                done();
            });
    });

    it('Should delete user', done => {
        chai
            .request(server)
            .delete(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(204);

                done();
            });
    });

    it('Should return 404 in PUT method', done => {
        chai
            .request(server)
            .put(`/api/users/${userId}`)
            .send({
                username: 'Newname',
                hobbies: [],
                age: 24,
            })
            .end((err, res) => {
                expect(res).to.have.status(404);

                done();
            });
    });

    it('Should return 404 in DELETE method', done => {
        chai
            .request(server)
            .delete(`/api/users/${userId}`)
            .end((err, res) => {
                expect(res).to.have.status(404);

                done();
            });
    });


}
