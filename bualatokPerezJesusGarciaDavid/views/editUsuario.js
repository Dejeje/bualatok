import { editUser, getUser } from '../src/Controller.js';
import { provincias } from '../src/Provinces';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('editButton').addEventListener('click', async function() {
        let username = document.getElementById('username').value;
        let name = document.getElementById('name').value;
        let surname = document.getElementById('surname').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let rePassword = document.getElementById('re-password').value;
        let credit = document.getElementById('credit').value;
        let province = document.getElementById('province').value;
        
        var user = await getUser();
        let newPassword = user.password;

        if (rePassword!== ""){
            if(password=== user.password)
                newPassword = rePassword;
        }

        editUser(username, name, surname, email, newPassword, credit, province);
    });
    document.getElementById('cancelButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    });

    var user = await getUser();

    let username = document.getElementById('username');
    username.value = user.username;
    username.setAttribute("readonly", true);
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
