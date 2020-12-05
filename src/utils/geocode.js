const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFjaGl0YnVjaGEiLCJhIjoiY2tnYjlyZzRwMGJoMjJ4cWFmcnduOWt2OCJ9.6dwpsQT2Rm4CmM_DBoJFoA&limit=1'
    //console.log(url)
    request({url, json:true}, (error, {body}) =>{
        if(error) {
            callback('Unable to connect', undefined)
        }else if(body.features.length === 0) {
            callback('Unable to find location try with diffrent search term', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    
}

module.exports = geocode