const form = document.querySelector('#form')
const usernameInput = document.querySelector('#username')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')

// Usernames can only contain letters a-z in lowercase
const isValidUsername = () => /^[a-z]+$/.test(usernameInput.value)

// Password must contain a lowercase, uppercase letter and a number
const isValidPassword = () =>
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(passwordInput.value)

// Email must contain an @ symbol and a domain name
const isValidEmail = () => /^[^@]+@[^@.]+\.[a-z]+$/i.test(emailInput.value)

//helper validation function
const validateField = (input, isValid) => {
  const label = input.parentNode
  const span = label.querySelector('span')

  //reset classes and hints
  label.classList.remove('error', 'valid')
  if (span) span.style.display = 'none'

  //run validation function
  if (isValid()) {
    label.classList.add('valid')
    return true
  } else {
    label.classList.add('error')
    if (span) span.style.display = 'inline'
    return false
  }
}

//live validation on input events
const inputs = [usernameInput, emailInput, passwordInput]
const validators = [isValidUsername, isValidEmail, isValidPassword]

inputs.forEach((input, i) => {
  input.addEventListener('input', () => {
    validateField(input, validators[i])
  })
})

// Add an event listener to the form listening for the submit event
form.addEventListener('submit', (e) => {
  //from above to be more dry
  const usernameIsValid = validateField(usernameInput, isValidUsername)
  const emailIsValid = validateField(emailInput, isValidEmail)
  const passwordIsValid = validateField(passwordInput, isValidPassword)

  //prevent default if invalid
  if (!usernameIsValid || !emailIsValid || !passwordIsValid) {
    e.preventDefault()
  }
})
