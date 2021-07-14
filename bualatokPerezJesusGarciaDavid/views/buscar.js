import { getProductsByFilter, comprarProducto } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('buscarButton').addEventListener('click', async () => {
        let text = document.getElementById('texto').value.toString();
        let minPrice = parseInt(document.getElementById('minPrice').value.toString());
        let maxPrice = parseInt(document.getElementById('maxPrice').value.toString());
        let category = document.getElementById('category').value;
        let state = '';

        if (document.getElementById('nuevoEstado').checked) {
            state = 'nuevo';
        }

        if (document.getElementById('buenoEstado').checked) {
            state = 'bueno';
        }

        if (document.getElementById('maloEstado').checked) {
            state = 'malo';
        }

        var products = await getProductsByFilter(text, minPrice, maxPrice, category, state);
        for (const product of products) {
            console.log(product);
            var container = document.getElementById('container');
            
            var div = document.createElement('div');
            
            var nombre = document.createElement('label');
            nombre.setAttribute('class','productLabel');
            nombre.appendChild(document.createTextNode(product.name));
          
            var description = document.createElement('label');
            description.setAttribute('class','productTextArea');
            description.appendChild(document.createTextNode(product.description));
            
            var price = document.createElement('label');
            price.setAttribute('class','productPrice');
            price.appendChild(document.createTextNode(product.price));

            var timesSeen = document.createElement('label');
            price.setAttribute('class','timesSeen');
            price.appendChild(document.createTextNode(product.timesSeen));

            var comprar = document.createElement('input');
            comprar.setAttribute('class','productButton');
            comprar.setAttribute('value', 'Comprar');
            comprar.setAttribute('type','button');
            comprar.addEventListener('click', async function() {
                comprarProducto(product.idproduct);
            });

            div.appendChild(nombre);
            div.appendChild(description);
            div.appendChild(price);
            div.appendChild(timesSeen);
            div.appendChild(comprar);
            
            container.appendChild(div);
        }
    })
    document.getElementById('volverButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    })
});
