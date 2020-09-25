const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = "Location: " + data.location
                messageTwo.textContent = location.toUpperCase()+"'s"+" current temprature is " +data.forecast.temperature +" degree. " +"and it's feels like " +data.forecast.feelslike +" degree. "+ "The Humidity is "+data.forecast.humidity
            }
        })
    })
})