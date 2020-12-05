const request = require('request')


const forecast = (land, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=352952aa2be67f58921e26048c79f4d5&query='+encodeURIComponent(land)+','+encodeURIComponent(long)+''
    //console.log(url)
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect', undefined)
        }else if(body.error) {
            callback('Unable to find try with diffrent search term', undefined)
            console.log(body.error)
        }else{
            callback(undefined, "It is currently "+body.current.temperature+" degree out. It Feels Like "+body.current.feelslike+" degree out.")
        }
    })
}

module.exports = forecast