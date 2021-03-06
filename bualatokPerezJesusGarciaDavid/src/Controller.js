function register(username, name, surname, email, password, credit, province) {
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

async function login(username, password) {
    const dataToSend = JSON.stringify({'username': username, 'password': password});

    const resp = await fetch('http://localhost:8080/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: dataToSend
    });

    if (resp.status === 200) {
        window.location.replace("../public/menu.html");
    } else {
       alert('Las credenciales son incorrectas'); 
    }
}

function logout() {
    fetch('http://localhost:8080/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    })
    .then(resp => {
        if (resp.status === 205)
            return true;
    })
    .then(() => {
        window.location.replace("../public/login.html");
        alert('Se ha cerrado sesión');
    })
}

function addProduct(name, price, description, category, state) {
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
    .then(() => {
        document.location.reload(true);
        alert('Producto registrado');
    })
    .catch(() => {
        alert('No se ha podido registrar el producto');
    });
}


function editUser(username, name, surname, email, password, credit, province) {
    const dataToSend = JSON.stringify({'username': username, 'name': name, 'surname': surname, 'email': email, 'password': password, 'credit': credit, 'province': province});

    fetch('http://localhost:8080/editUser', {
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

async function getUser() {
    const resp = await fetch('http://localhost:8080/getUser', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });

    let respJson = await resp.json();
    console.log(respJson);
    return respJson;
}

async function getAllProducts() {
    const resp = await fetch('http://localhost:8080/getProducts', {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
    let respJson = await resp.json();
    console.log(respJson);
    return respJson;
}

async function comprarProducto(idProduct) {
    const dataToSend = JSON.stringify({'idProduct': idProduct});

    fetch('http://localhost:8080/comprar', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: dataToSend
    })
    .then(resp => {
        if (resp.status === 200) {
            return true;
        } else if (resp.status === 404) {
            return Promise.reject('no encontrado');
        } else if (resp.status === 400)
            return Promise.reject('no credito')
    })
    .then(() => {
        alert('Producto comprado');
    })
    .catch(err => {
        if (err.message === 'no encontrado')
            alert('El producto ya no está a la venta');
        if (err.message === 'no encontrado')
            alert('No hay credito suficiente');
    });
}

async function getProductsByFilter(text, minPrice, maxPrice, category, state) {
    const dataToSend = JSON.stringify({'text': text, 'minPrice': minPrice, 'maxPrice': maxPrice, 'cateogory': category, 'state': state});
    
    const resp = await fetch('http://localhost:8080/getProductsByFilter', {
        method: 'post',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        body: dataToSend
    });
    let respJson = await resp.json();
    return respJson;
}

export { register, login, logout, addProduct, editUser, getUser, getAllProducts, getProductsByFilter, comprarProducto };
