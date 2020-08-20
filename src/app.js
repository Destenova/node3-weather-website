const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require("request");
const funcs = require('./utils/geocode.js');
const { brotliDecompressSync } = require('zlib');


const app = express()
const port = process.env.PORT || 3000
//Define paths for ecpress config
const publicDir=path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const PartialPath = path.join(__dirname,'../templates/partials')
// setup handlebars engine
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(PartialPath)


// setup static directory to serve
app.use(express.static(publicDir))



app.get('',(req,res)=>{
    res.render('index', {
        title : 'Weathers',
        name: 'Hamda Tr'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about',
        name: 'hamda tr'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help page',
        name:'hamda tr'
    })
})

app.get('/weather',(req,res) =>{
    if (!req.query.address) {
        return res.send({
            error : 'you must provide a search term'
        })
    }

    //-------
    if(req.query.address){
        funcs.geocode (req.query.address, (error,{latitude, longitude,location} = {})=>{
            if(error){
                return res.send({
                    error : error
                })
            }
        
            
            funcs.forecast(latitude, longitude, (error, fordata) => {
                if(error){
                    return res.send({
                        error : error
                    })
                }
        
                res.send({
                    address : req.query.address,
                    location,
                    forecast: fordata,
                    
                })

        
          })
        })
        }else{
        return res.send({
            error : 'you must provide an adress'
        })        }
        //--------

/*
    res.send({
        adress : req.query.address,
        forecast:'Clear',
        location: 'Bizerte'
        
    })  */
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({
            error : 'you must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{title:'404', error:'Help Article not found !'})
})


app.get('*',(req,res)=>{
    res.render('404',{title:'404', error:'Page not found !'})
})

//listen on port 3000
app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})