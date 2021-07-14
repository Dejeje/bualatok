import User from "./User.js";

let instance = null;

class Controller {
    constructor() {
        if (!instance)
            instance = this;

        this.currentUser = null;

        return instance;
    }

    register(username, name, surname, email, password, credit, province) {
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
    }

    async login(username, password) {
        const dataToSend = JSON.stringify({'username': username, 'password': password});

        const resp = await fetch('http://localhost:8080/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        });

        let jsonResp;
        if (resp.status === 200) {
            jsonResp = await resp.json();
            this.currentUser = new User(jsonResp.name, jsonResp.surname, jsonResp.username, jsonResp.password, jsonResp.credit, jsonResp.province, jsonResp.email);
            window.location.replace("../public/menu.html");
        } else {
           alert('Las credenciales son incorrectas'); 
        }
    }

    addProduct(name, price, description, category, state) {
        console.log(this.currentUser);
        const dataToSend = JSON.stringify({'name': name, 'description': description, 'price': price, 'category': category, 'state': state, 'date': new Date().toDateString(), "owner": this.currentUser.username});
        
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
        .then(() => {
            document.location.reload(true);
            alert('Producto registrado');
        })
        .catch(() => {
            alert('No se ha podido registrar el producto');
        });
    }
}

function editUser(username, name, surname, email, password, credit, province) {
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
}

export { register, login, addProduct };
