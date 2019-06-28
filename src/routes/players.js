import Router from 'koa-router'
import fs from "fs";

const route = new Router({
    prefix: '/players'
})

const JSON_PATH = '../headtohead.json'

route.get('/', ctx => {
    const { players } = require(JSON_PATH)
    if (players) players.sort((a, b) => a.id > b.id)
    ctx.body = players
})

route.get('/:id', ctx => {
    const { id } = ctx.params
    const data = require(JSON_PATH)
    const player = data.players.find(e => e.id == id)
    if (player !== undefined) {
        ctx.body = player
    }
})

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