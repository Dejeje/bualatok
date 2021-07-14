import { register } from '../src/Controller.js';
import { provincias } from '../src/Provinces.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let rePassword = document.getElementById('re-password').value;
        let credit = document.getElementById('credit').value;
        let province = document.getElementById('province').value;
        
        if (username === '' || name === '' || surname === '' || email === '' || password === '' || rePassword === '' || credit === '' || province === '') {
            alert('Son necesarios todos los parámetros');
            return;
        }

        if (credit <= 0) {
            alert('El crédito debe ser mayor que 0');
            return;
        }

        if (password !== rePassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        register(username, name, surname, email, password, credit, province);
    });
    document.getElementById('loginButton').addEventListener('click', function() {
        window.location.replace('../public/login.html');
    });
    var provinciasSel = document.getElementById('province');
    for (const provincia in provincias){
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(provincia) );
        opt.value = provincias[provincia]; 
        provinciasSel.appendChild(opt);
    }
})

