const http = require('http')
const url = require('url')

const server = http.createServer(async (req, res) => {
  const route = url.parse(req.url).pathname

  try {
    if (route === '/orders') {
      const orders = [
        {
          id: 1,
          items: [
            {
              name: 'burger',
              quantity: 2,
              value: 100,
            },
          ],
        },
      ]
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(orders))
    }
  } catch (error) {
    res.writeHead(500).end()
  }
})

module.exports = {
  startServer: (port, cb) => {
    server.listen(port, () => {
      cb(server)
    })
  },
}
