const path = require('path')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
 
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const PublicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("view engine", 'hbs')
app.set("views", viewPath)
hbs.registerPartials(partialsPath)


app.use(express.static(PublicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prabhakar Yadav'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the text present on the help page',
        name: 'Prabhakar Yadav'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        aboutText: 'This is the text present on the about page',
        name: 'Prabhakar Yadav'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address!"
        })
    }

    //console.log(req.query)
    const ads = req.query.address

    geocode(ads, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location: location,
                forecast:forecastData,
                address: ads
            })
        })
    })
})

app.get('*', (req, res) => {
    //res.send("404 You caught an error!!!!!!")
    res.render('404', {
        name: 'Prabhakar Yadav',
        msg_404: 'Page Not Found'
    })
})

app.get('/help/*', (req, res) => {
    //res.send("404 You caught an error!!!!!!")
    res.render('404', {
        name: 'Prabhakar Yadav',
        msg_404: 'Help article not found'
    })
})

app.listen(port, () => {
    console.log("Server is started at port number 3000")
})