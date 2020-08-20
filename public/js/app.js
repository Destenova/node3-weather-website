console.log('client js file loaded !')

/*
fetch('http://localhost:3000/weather?address=boston').then((response)=>{
    response.json().then((data)=> {
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data)
        }
    })
})*/

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    
    messageOne.textContent='Loading...'
    messageTwo.textContent=''
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=> {
        if(data.error){
            console.log(data.error)
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }else{
            messageOne.textContent=data.location
            //messageTwo.textContent=data.forecast.temp.value+ ' C°'
            messageTwo.textContent=data.forecast
        }
    })
})
})