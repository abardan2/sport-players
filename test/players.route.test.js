import Chai from 'chai'
import ChaitHttp from 'chai-http'

import server from '../src/index'

const should = Chai.should()
Chai.use(ChaitHttp)

describe('routes : /players', () => {

    describe('GET /', () => {
        it('should return status 200', done => {
            Chai.request(server)
                .get('/players')
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
    })

    describe('GET /:id', () => {
        it('should return status 200', done => {
            Chai.request(server)
                .del('/players/99999')
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
    })

    describe('DELETE /:id', () => {
        it('should return status 200', done => {
            Chai.request(server)
                .del('/players/99999')
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
    })
})