import Router from 'koa-router'

const route = new Router({
    prefix: '/players'
})

route.get('/', ctx => {
    const { players } = require('../headtohead.json')
    if (players) players.sort((a, b) => a.id > b.id)
    ctx.body = players
})

route.get('/:id', ctx => ctx.status = 200)
route.del('/:id', ctx => ctx.status = 200)

export default route