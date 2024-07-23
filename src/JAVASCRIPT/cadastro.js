function renderizarUsuarios() {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userTableBody = document.querySelector("#userTable tbody");
    userTableBody.innerHTML = "";

    users.forEach(user => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editarUsuario('${user.email}')">Editar</button>
                <button onclick="excluirUsuario('${user.email}')">Excluir</button>
            </td>
        `;

        userTableBody.appendChild(row);
    });
}


function editarUsuario(email) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const index = users.findIndex(user => user.email === email);

    if (index !== -1) {
        const newName = prompt("Digite o novo nome:");
        const newPassword = prompt("Digite a nova senha:");
        if (newName && newPassword) {
            users[index].name = newName;
            users[index].password = newPassword;
            localStorage.setItem("users", JSON.stringify(users));
            renderizarUsuarios();
            alert("Usuário editado com sucesso!");
        } else {
            alert("Dados inválidos.");
        }
    } else {
        alert("Usuário não encontrado.");
    }
}


function excluirUsuario(email) {
    const confirmacao = confirm("Deseja excluir o usuário?");
    if (confirmacao) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.email !== email);
        localStorage.setItem("users", JSON.stringify(users));
        renderizarUsuarios();
        alert("Usuário excluído!");
    }
}


const form = document.querySelector("#Form");
const nameInput = document.querySelector("#Nome");
const emailInput = document.querySelector("#Email");
const passwordInput = document.querySelector("#senha");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    
    if (nameInput.value.trim() === "") {
        alert("Por favor, preencha o seu nome.");
        return;
    }

    
    if (emailInput.value.trim() === "" || !isEmailValid(emailInput.value)) {
        alert("Por favor, cheque seu e-mail.");
        return;
    }

    if (!validatePassword(passwordInput.value, 7)) {
        alert("A senha deve ter no mínimo 7 dígitos!");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const newUser = {
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    alert("Cadastrado com sucesso!");

    
    renderizarUsuarios();

    
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
});


function isEmailValid(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


function validatePassword(password, minDigits) {
    return password.length >= minDigits;
}


document.addEventListener("DOMContentLoaded", renderizarUsuarios);
