document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', function() {
        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        const dataToSend = JSON.stringify({'username': username, 'password': password});

        fetch('http://localhost:8080/login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 200)
                return resp.json();
            else
                return Promise.reject();
        })
        .then(jsonResp => {
            alert(jsonResp);
        })
        .catch(err => {
            alert('Usuario no registrado');
        })
    })

});
