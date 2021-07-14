import { getAllProducts } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('edit-user').addEventListener('click', function() {
        window.location.replace('../public/editUsuario.html');
    });
    document.getElementById('registerProduct').addEventListener('click', function() {
        window.location.replace('../public/registroProducto.html');
    });
    document.getElementById('searchProduct').addEventListener('click', function() {
        window.location.replace('../public/buscar.html');
    });
    document.getElementById('products').addEventListener('click', function() {
        getAllProducts();
    });
    document.getElementById('logout').addEventListener('click', function() {
        window.location.replace('../public/login.html');
    });

});
