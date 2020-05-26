const weatherForm = document.querySelector('form')
const searchParam = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const weatherIcon = document.querySelector('#weather-icon')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = searchParam.value

  messageOne.textContent = 'Loading..'
  messageTwo.textContent = ''
  weatherIcon.setAttribute("src", "")
  

  fetch(`/weather?address=${location}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      messageOne.textContent = data.error.toString()
    } else {
      messageOne.textContent = data.address.toString()
      messageTwo.textContent = data.forecast.toString()
      weatherIcon.setAttribute("src", data.img)
    }
  })
})

})