import { login } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        login(username, password);
    })

});
