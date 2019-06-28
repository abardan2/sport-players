import Koa from'koa'


const PORT = process.env.PORT || 80
const app = new Koa()
const server = app.listen(PORT, () => console.log(console.log(`Server running on port ${PORT}.`)))

export default server