document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerButton').addEventListener('click', function() {
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let price = document.getElementById('price').value;
        let category = document.getElementById('category').value;
        let state = document.getElementsByName('state').value;
        let photo = provincias[document.getElementById('photo').value];

        const dataToSend = JSON.stringify({'name': name, 'description': description, 'price': price, 'category': category, 'state': state, 'photo': photo});

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
        .then(registered => {
            alert(registered);
        })
        .catch(err => {
            console.log('aqui');
        })
    });
})