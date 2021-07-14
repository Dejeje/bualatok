import Controller from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        var controller = new Controller();
        controller.login(username, password);
    })

});
