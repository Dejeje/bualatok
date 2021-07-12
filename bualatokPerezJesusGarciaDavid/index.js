document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerButton').addEventListener("click", function() {
        let username = document.getElementById("username").value;
        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let credit = document.getElementById("credit").value;
        let province = "MUR";

        console.log(username);

        var request = new XMLHttpRequest();
        request.onreadystatechange = mostrar;
        request.open('POST', 'http://localhost:8080/register', true);
        request.send({username, name, surname, email, password, credit, province});

        function mostrar() {
            if(request.readyState == 4) {
                if(request.status == 200) {
                    alert(request.responseText);
                }
            }
        }
    });
})

