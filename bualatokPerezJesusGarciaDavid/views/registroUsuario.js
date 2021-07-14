import { register } from '../src/Controller.js';

const provincias = {
    'Andalucia' : 'AND', 'Aragon' : 'ARA',
    'Asturias' : 'AST', 'Baleares' : 'BAL',
    'Canarias' : 'CAN', 'Cantabria' : 'CANT',
    'Castilla y Leon' : 'CLE', 'Castilla-La Mancha' : 'CMA',
    'Cataluña' : 'CAT', 'Valencia' : 'VAL',
    'Extremadura' : 'EXT', 'Galicia' : 'GAL',
    'Madrid' : 'MAD', 'Murcia' : 'MUR',
    'Navarra' : 'NAV', 'Pais Vasco' : 'PVA', 'Rioja' : 'RIO'
}

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
        
        // TODO : checkear parametros
        register(username, name, surname, email, password, credit, province);
    });

    var provinciasSel = document.getElementById('province');
    for (const provincia in provincias){
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(provincia) );
        opt.value = provincias[provincia]; 
        provinciasSel.appendChild(opt);
    }
})

