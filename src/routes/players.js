import Router from 'koa-router'

const route = new Router({
    prefix: '/players'
})

route.get('/', ctx => ctx.status = 200)
route.get('/:id', ctx => ctx.status = 200)
route.del('/:id', ctx => ctx.status = 200)

export default route