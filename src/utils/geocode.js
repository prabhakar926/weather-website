const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +address+ '.json?access_token=pk.eyJ1IjoicHJhYmhha2FyOTI2IiwiYSI6ImNrNm5mN3hvMzBvMmQzanJ1YmQzeGZ1bXkifQ.T7JEWEU-Jao_ULD-REPO7w&limit=1'

    request({url, json:true}, (error, { body }) => {
        console.log("step-1")
        if(error) {
            callback('Unable to connect to Location Service!', undefined)
        } else if(body.features.length === 0) {
            console.log("step-2")
            //callback('Unable to find the Location. Try another Search.', undefined)
            console.log('going back to app.js')
            callback('Unable to Find your Location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode