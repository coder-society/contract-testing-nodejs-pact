const { startServer } = require('./provider')

startServer(8080, () => {
  console.log('Server is running on http://localhost:8080')
})
