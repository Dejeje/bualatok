import { getAllProducts } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', async () => {
    var products = await getAllProducts();
    for (const product of products) {
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

        div.appendChild(nombre);
        div.appendChild(description);
        div.appendChild(price);
        
        container.appendChild(div);
    }

    document.getElementById('volverButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    })
});
