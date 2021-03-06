import { addProduct } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerButton').addEventListener('click', async function() {
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let price = document.getElementById('price').value;
        let category = document.getElementById('category').value;
        let state;

        if (document.getElementById('nuevoEstado').checked) {
            state = 'nuevo';
        }

        if (document.getElementById('buenoEstado').checked) {
            state = 'bueno';
        }

        if (document.getElementById('maloEstado').checked) {
            state = 'malo';
        }
        addProduct(name, price, description, category, state);        
    });
    document.getElementById('cancelButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    });

})
