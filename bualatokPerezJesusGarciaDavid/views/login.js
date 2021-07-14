import { login } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
    
        if (username === '' || password === '') {
            alert('Debes introducir usuario y contraseña');
            return;
        }

        login(username, password);
    })
    document.getElementById('registroButton').addEventListener('click', function() {
        window.location.replace('../public/registroUsuario.html');
    })

});
