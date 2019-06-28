import Router from 'koa-router'
import fs from "fs";

const route = new Router({
    prefix: '/players'
})

const JSON_PATH = '../headtohead.json'

// return a list of players
route.get('/', ctx => {
    const { players } = require(JSON_PATH)
    // ASC sorting players by id
    if (players) players.sort((a, b) => a.id > b.id)
    ctx.body = players
})

// return a player or return a 404 error status if not exist
route.get('/:id', ctx => {
    const { id } = ctx.params
    const data = require(JSON_PATH)
    const player = data.players.find(e => e.id == id)
    if (player !== undefined) {
        ctx.body = player
    }
})

// delete a player or return a 404 error status if the id user not exist
route.del('/:id', ctx => {
    const { id } = ctx.params
    const data = require(JSON_PATH)
    const index = data.players.findIndex(e => e.id == id)
    if (index !== -1) {
        data.players.splice(index, 1)
        fs.writeFileSync(__dirname + '/' + JSON_PATH, JSON.stringify(data))
        ctx.status = 200
    }
})

export default route