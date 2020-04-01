import * as express from 'express'
const app = express()

app.use(express.static('public'))

app.get('/api', (req, res) => {
  res.send('Hello world!!!')
})

app.get('/*', function (req, res) {
  res.sendFile('public/index.html')
})

app.listen(5000, () => console.log('Your app is listening on port ' + 5000))