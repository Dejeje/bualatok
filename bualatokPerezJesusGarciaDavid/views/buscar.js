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
      
        var description = document.createElement('textarea');
        description.setAttribute('class','productTextArea');
        description.setAttribute("readonly", true);
        description.value = product.description;
        
        var price = document.createElement('input');
        price.setAttribute('class','productPrice');
        price.setAttribute('type','number');
        price.setAttribute("readonly", true);
        price.value = product.price;

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
