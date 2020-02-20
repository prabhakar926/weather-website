const request = require('request')

const forecast = (long, lat, callback) => {
    
    const url = 'https://api.darksky.net/forecast/298f7a3558154d068cc6e63a3494100d/'+lat+','+long+'?units=si'
    
    request({url, json:true}, (error, { body }) => {
        if(error) {
            callback("Unable to connect to the network", undefined)
        }else if(body.error) {
            callback("Unable to find the location")
        } else {
            //console.log(body.daily.data[0].summary+' It is currently '+body.currently.temprature+' degrees out. There is a '+body.currently.precipProbability+' % chances of rain')
            callback(undefined, body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+' % chances of rain')
        }
    })
}

module.exports = forecast