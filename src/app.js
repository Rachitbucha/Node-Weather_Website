const express = require('express');
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const publicdirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


//setting up handle bars
app.set('view engine', 'hbs' )
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to save
app.use(express.static(publicdirectorypath))

app.get('', (req,res) => {
    res.render('index', {
        title: 'Wheather',
        name: 'Rachit Bucha'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About',
        name: 'Rachit Bucha'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        text: 'This is help section',
        name: 'Rachit Bucha'
    })
})

app.get('/products', (req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'Kindly provide the search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})


app.get('/wheather', (req,res) =>{
    
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if(error)
            {
                return res.send({error})
            }
    
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })

    })
    

    // res.send({
    //     forecast:'35%',
    //     location:'India',
    //     address: req.query.address
    // })
})

app.get('*', (req,res) =>{
    res.render('404',{
        error:'404 Page Not Found',
        name: 'Rachit Bucha'})
})


app.listen(port, ()=> {
    console.log("Server is up on port "+port)
})