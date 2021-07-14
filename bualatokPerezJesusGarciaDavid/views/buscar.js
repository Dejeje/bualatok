import { getAllProducts, comprarProducto } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', async () => {
    var products = await getAllProducts();
    
    var i = 0;
    //guardar id hidden
    for (const product of products) {
        console.log(product);
        var container = document.getElementById('container');
        
        var div = document.createElement('div');
        
        var hidden_id = document.createElement('label');
        hidden_id.setAttribute('id', i);
        hidden_id.setAttribute('value', product.id);
        hidden_id.hidden = true;

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
        comprar.setAttribute('value', 'Comprar');
        comprar.setAttribute('type','button');
        comprar.addEventListener('click', async function() {
            console.log(document.getElementById(i.toString()).value);
        });

        div.appendChild(nombre);
        div.appendChild(description);
        div.appendChild(price);
        div.appendChild(comprar); 
        
        container.appendChild(div);

        ++i;
    }
});
