import Koa from'koa'

import PlayersRoute from './routes/players'

const PORT = process.env.PORT || 80
const app = new Koa()
const server = app
    .use(PlayersRoute.routes())
    .listen(PORT, () => console.log(`Server running on port ${PORT}.`))

export default server