const request = require('request')

//get the long/lat of a city name
const geocode = (adress, callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(adress)+'.json?access_token=pk.eyJ1Ijoibm92YW5vdmEiLCJhIjoiY2tjeGh3N2ZwMDA3ZDJ3bXJwYmJ6eXQyZCJ9.ru-z3kSHckZ0JBrtbip-Rg&limit=1'
    request({url , json:true}, (error, {body}) => {
        if(error){
            callback('Unable to connect ')
        }else if(body.features.length == 0){
            callback('Try another adress')
        }else{
            callback(undefined, {
                latitude : body.features[0].center[0],
                longitude : body.features[0].center[1],
                location : body.features[0].place_name
            })
        }
    })
    
}

const forecast = ((longitude, latitude, callback)=>{
    var options = {
        method: 'GET',
        url: 'https://api.climacell.co/v3/weather/realtime',
        qs: {fields: 'weather_code,temp',unit_system: 'si',  lat: latitude, lon: longitude,apikey: 'wLpOKFDWMIb0z9r585lCLXC7EpkrCsCU'},
        json: true
      };
      
      request(options, (error, {body})=> {
        if(error){ 
            callback('Unable to connect',undefined)
        }else if(body.errorCode){
            callback('Unable to find location')
        }else{
            callback(undefined,'The temperature is '+body.temp.value+' and the weather is '+body.weather_code.value)
            //callback(undefined,body)
        }
    })
})
module.exports = {
    geocode:geocode,
    forecast:forecast
}