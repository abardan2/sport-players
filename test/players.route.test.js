import Chai from 'chai'
import ChaitHttp from 'chai-http'
import fs from 'fs'

import server from '../src/index'

const should = Chai.should()
Chai.use(ChaitHttp)

describe('routes : /players', () => {

    // reinit the json data to avoid any surprise of a manual interaction
    const reinitdata = () => {
        const data = require('./headtohead.bak.json')
        fs.writeFileSync(__dirname + '/' + '../src/headtohead.json', JSON.stringify(data))
    }

    before(reinitdata)
    after(reinitdata)

    describe('GET /players', () => {
        it('should return status 200', done => {
            Chai.request(server)
                .get('/players')
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
        it('should return an array of valid object', done => {
            Chai.request(server)
                .get('/players')
                .end((err, res) => {
                    res.body.forEach(element => {
                        element.should.include.keys(
                            'id', 'firstname', 'lastname', 'shortname', 'sex', 'country', 'picture', 'data'
                        )
                    })
                    done()
                })
        })
    })

    describe('GET /players/:id', () => {
        const { players } = require('../src/headtohead.json')
        const player =  players[0]
        it('should return status 404 on unknow id', done => {
            Chai.request(server)
                .get('/players/99912399')
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(404)
                    done()
                })
        })
        it('should return status 200', done => {
            Chai.request(server)
                .get('/players/' + player.id)
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
    })

    describe('DELETE /players/:id', () => {
        const { players } = require('../src/headtohead.json')
        const player =  players[0]
        it('should return status 200 on delete', done => {
            Chai.request(server)
                .del('/players/' + player.id)
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(200)
                    done()
                })
        })
        it('should return status 404 with a delete id', done => {
            Chai.request(server)
                .del('/players/' + player.id)
                .end((err, res) => {
                    should.not.exist(err)
                    res.status.should.eql(404)
                    done()
                })
        })
    })
})