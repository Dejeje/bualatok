import { editUser, getUser } from '../src/Controller.js';

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

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('editButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let rePassword = document.getElementById('re-password').value;
        let credit = document.getElementById('credit').value;
        let province = document.getElementById('province').value;
        
        // TODO : checkear parametros 
        // TODO comprobar password es igual a la que tiene el usuario y se guarda la nueva

        editUser(username, name, surname, email, rePassword, credit, province);
    });
    var user = await getUser();

    let username = document.getElementById('username');
    username.value = user.username;
    let name = document.getElementById('name');
    name.value = user.name;
    let surname = document.getElementById('surname');
    surname.value = user.surname;
    let email = document.getElementById('email');
    email.value = user.email;
    let credit = document.getElementById('credit');
    credit.value = user.credit;
    
    var provinciasSel = document.getElementById('province');
    for (const provincia in provincias){
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(provincia) );
        opt.value = provincias[provincia];
        if(provincias[provincia] == user.province){
            opt.selected = true; 
        }
        provinciasSel.appendChild(opt);
    }
})
