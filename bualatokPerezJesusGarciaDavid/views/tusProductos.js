import { getAllProducts } from '../src/Controller.js';

document.addEventListener('DOMContentLoaded', async () => {
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);
    
    var container = document.getElementById('container');
    container.appendChild(table);

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Nombre";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Descripcion";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Precio";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    thead.appendChild(row_1);

    var products = await getAllProducts();
    for (const product of products) {
        var nombre = document.createElement('label');
        nombre.setAttribute('class','productLabel');
        nombre.appendChild(document.createTextNode(product.name));
      
        var description = document.createElement('label');
        description.setAttribute('class','productTextArea');
        description.appendChild(document.createTextNode(product.description));
        
        var price = document.createElement('label');
        price.setAttribute('class','productPrice');
        price.appendChild(document.createTextNode(product.price));

        let row = document.createElement('tr');
        let data_1 = document.createElement('td');
        data_1.appendChild(nombre);
        let data_2 = document.createElement('td');
        data_2.appendChild(description);
        let data_3 = document.createElement('td');
        data_3.appendChild(price);
        row.appendChild(data_1);
        row.appendChild(data_2);
        row.appendChild(data_3);
        tbody.appendChild(row);
    }

    document.getElementById('volverButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    })
});
