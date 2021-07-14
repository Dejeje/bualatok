import User from "./User.js";


var myInstance = (function() {
    var currentUser;
  
    function privateMethod () {
      // ...
    }
  
    return { // public interface
    
    register: function (username, name, surname, email, password, credit, province) {
        const dataToSend = JSON.stringify({'username': username, 'name': name, 'surname': surname, 'email': email, 'password': password, 'credit': credit, 'province': province});
    
        fetch('http://localhost:8080/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 201) {
                return true;
            } else if (resp.status === 409) {
                return Promise.reject();
            }
        })
        .then(() => {
            document.location.reload(true);
            alert('Usuario registrado');
        })
        .catch(err => {
            alert('Ya existe un usuario con estos datos');
        });
    },
    login: function (username, password) {
        const dataToSend = JSON.stringify({'username': username, 'password': password});
    
        fetch('http://localhost:8080/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 200)
                return resp.json();
            else
                return Promise.reject();
        })
        .then(jsonResp => {
            currentUser = new User(jsonResp.name, jsonResp.surname, jsonResp.username, jsonResp.password, jsonResp.credit, jsonResp.province, jsonResp.email);
            // TODO : pasar a panel principal
            window.location.replace("/public/buscar.html");
        })
        .catch(err => {
        });
    },
    addProduct: function () {
        const dataToSend = JSON.stringify({'name': name, 'description': description, 'price': price, 'category': category, 'state': state, 'date': new Date().toDateString()});
    
        fetch('http://localhost:8080/registerProduct', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 201) {
                return true;
            } else if (resp.status === 409) {
                return Promise.reject()
            }
        })
        .then(registered => {
            document.location.reload(true);
            alert('Producto registrado');
        })
        .catch(err => {
            
        });
    },
    editUser: function (username, name, surname, email, password, credit, province) {
        const dataToSend = JSON.stringify({'username': username, 'name': name, 'surname': surname, 'email': email, 'password': password, 'credit': credit, 'province': province});
    
        fetch('http://localhost:8080/edit', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 201) {
                return true;
            } else if (resp.status === 409) {
                return Promise.reject();
            }
        })
        .then(() => {
            document.location.reload(true);
            alert('Usuario editado');
        })
        .catch(err => {
            alert('No se han podido editar los datos');
        });
    },
    getUser: function (){
        return currentUser;
    }

    };
  })();

export { register, login, addProduct, editUser, getUser };