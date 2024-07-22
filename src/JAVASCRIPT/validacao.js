btn.addEventListener('click', ()=> {

  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
      inputSenha.setAttribute('type', 'text')
  } else {
      inputSenha.setAttribute('type', 'password')
  }
})

function entrar() {
  let email = document.querySelector('#email')
  let userLabel = document.querySelector('#userLabel')

  let senha = document.querySelector('#senha')
  let senhaLabel = document.querySelector('#senhaLabel')

  let listaUser = []

  let userValid = {
      name: '',
      email: '',
      password: ''
  }

  listaUser = JSON.parse(localStorage.getItem('users')) || []
  
  listaUser.forEach((item) => {
      if (email.value == item.email && senha.value == item.password) {
          
          userValid = {
              name: item.name,
              email: item.email,
              password: item.password
          }

      }
  })

  if (email.value == userValid.email && senha.value == userValid.password) {
      window.location.href = "index.html";
      let token = Math.random().toString(16).substr(2) + Math.random().toString(16).substr(2)
      localStorage.setItem('token',token)

      localStorage.setItem('userLogado',JSON.stringify(userValid))
      alert ('Login feito com sucesso!')
  } else {
      alert ('Usuário ou Senha incorretos.')
  }
}
