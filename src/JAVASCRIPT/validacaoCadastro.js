document.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById('cadastroForm').addEventListener('submit', function(event) {

        // Obtém o valor do campo de nome
        const nomePessoa = document.getElementById('nome').value;

        // Obtém o valor do campo de senha
        const password = document.getElementById('password').value;

        const errorPassword = document.getElementById('passwordError');
        const errorNome =  document.getElementById('nomeError');

        let ocorreuErro = false;

        if(!validarNomePessoa(nomePessoa))
        {
            ocorreuErro = true;

            // Previne o envio do formulário
            event.preventDefault();

            // Exibe a mensagem de erro
            errorNome.style.display = 'block';
        }
        else 
        {
            // Oculta a mensagem de erro, se estiver visível
            errorNome.style.display = 'none';
        }

        // Verifica se a senha possui mais de 6 dígitos
        if (password.length <= 6) 
        {
            // Previne o envio do formulário
            if(!ocorreuErro)
                event.preventDefault();
            
            ocorreuErro = true;            

            // Exibe a mensagem de erro
            errorPassword.style.display = 'block';
        }
        else
        {
            // Oculta a mensagem de erro, se estiver visível
            errorPassword.style.display = 'none';
        }

        if (!ocorreuErro)
        {
           // Carregar dinamicamente o HTML
            fetch('feed.html').then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar a página do feed');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('body').innerHTML = data;
            }).catch(error => {
                console.error('Erro:', error);
            })

        }
    })
})



function validarNomePessoa(nomePessoa)
{
    // Define a regex para validar o nome de usuário
    const usernameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;

    return usernameRegex.test(nomePessoa);
}