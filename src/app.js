const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express path
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static directory for server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Jack Collins'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Jack Collins'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'This the help message. For help text a nigga @ 503-954-6705',
    subMessage: 'Aight bet. We out this mf',
    name: 'Jack Collins'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You need to provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send(error)
      }

      res.send({
        address: location,
        forecast: forecastData
      })
    })
  })
})
  


app.get('/products', (req, res) => {
  if (!req.query.search) {
   return res.send({
      error: 'You must provide a search term'
    })
  }
  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'This help page aint it chief. Try going back.',
    name: 'Jack Collins'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Oops you found our 404 Page. Try going back.',
    name: 'Jack Collins'
  })
})

app.listen(port, () => {
  console.log(`Server is up on ${port}.`)
})