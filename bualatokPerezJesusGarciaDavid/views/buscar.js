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
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Numero de visitas";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Comprar";

        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        row_1.appendChild(heading_5);
        thead.appendChild(row_1);
        

        var products = await getProductsByFilter(text, minPrice, maxPrice, category, state);
        for (const product of products) {
            console.log(product);
            
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
            timesSeen.setAttribute('class','timesSeen');
            timesSeen.appendChild(document.createTextNode(product.timesSeen));

            var comprar = document.createElement('input');
            comprar.setAttribute('class','productButton');
            comprar.setAttribute('value', 'Comprar');
            comprar.setAttribute('type','button');
            comprar.addEventListener('click', async function() {
                comprarProducto(product.idproduct);
            });



            let row = document.createElement('tr');
            let data_1 = document.createElement('td');
            data_1.appendChild(nombre);
            let data_2 = document.createElement('td');
            data_2.appendChild(description);
            let data_3 = document.createElement('td');
            data_3.appendChild(price);
            let data_4 = document.createElement('td');
            data_4.appendChild(timesSeen);
            let data_5 = document.createElement('td');
            data_5.appendChild(comprar);

            row.appendChild(data_1);
            row.appendChild(data_2);
            row.appendChild(data_3);
            row.appendChild(data_4);
            row.appendChild(data_5);
            tbody.appendChild(row);

/*
            div.appendChild(nombre);
            div.appendChild(description);
            div.appendChild(price);
            div.appendChild(timesSeen);
            div.appendChild(comprar);
*/
           // container.appendChild(div);
        }
    })
    document.getElementById('volverButton').addEventListener('click', function() {
        window.location.replace('../public/menu.html');
    })
});
