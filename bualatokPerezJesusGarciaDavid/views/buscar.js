import { getAllProducts, comprarProducto } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', async () => {
    var products = await getAllProducts();
    
    
    //guardar id hidden
    for (const product of products) {
        console.log(product);
        var div = document.getElementById('container');
        
        var nombre = document.createElement('label');
        nombre.setAttribute('class','productLabel');
        nombre.appendChild(document.createTextNode(product.name));
      
        var description = document.createElement('label');
        description.setAttribute('class','productTextArea');
        description.appendChild(document.createTextNode(product.description));
        
        var price = document.createElement('label');
        price.setAttribute('class','productPrice');
        price.appendChild(document.createTextNode(product.price));

        var comprar = document.createElement('input');
        comprar.setAttribute('class','productButton');
        comprar.setAttribute('type','button');
        comprar.addEventListener('click', async function(product) {
            await comprarProducto(product.id);
        });

        div.appendChild(nombre);
        div.appendChild(description);
        div.appendChild(price);
        div.appendChild(nombre); 
    }
});
