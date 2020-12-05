console.log('Client side javascript file is loaded')



const wheatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

wheatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/wheather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            messageOne.textContent=data.error
            //console.log(data.error)
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            
            //console.log(data.location)
            //console.log(data.forecast)
        }
    })
})


    console.log(location)
})