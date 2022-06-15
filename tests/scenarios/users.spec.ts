import chai from "chai";
import  http  from "http";

export function usersTests(expect:Chai.ExpectStatic,server:http.Server): void {
    let user: string;

    it('Should create first user', done => {
        chai
            .request(server)
            .post('/api/users')
            .send({
                username: 'First user',
                age: 42,
                hobbies: [],
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(JSON.parse(res.text).username).to.equal('First user');

                user = res.text;
                done();
            });
    });

    it('Should create second user', done => {
        chai
            .request(server)
            .post('/api/users')
            .send({
                username: 'Second user',
                age: 24,
                hobbies: ['Some hobby'],
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(JSON.parse(res.text).username).to.equal('Second user');

                done();
            });
    });

    it('should get two users', done => {
        chai
            .request(server)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).length).to.equals(2);

                done();
            });
    });

    it('Should delete first user', (done) => {
        chai
            .request(server)
            .delete(`/api/users/${JSON.parse(user).id}`)
            .end((err, res) => {
                expect(res).to.have.status(204);

                done();
            });
    });

    it('Should return one user', done => {
        chai
            .request(server)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(JSON.parse(res.text).length).to.equals(1);

                done();
            });
    });
}
