import Router from 'koa-router'

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
    } else {
        ctx.status = 404
    }
})
route.del('/:id', ctx => ctx.status = 200)

export default route