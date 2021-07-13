document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('registerButton').addEventListener("click", function() {
        let username = document.getElementById("username").value;
        let name = document.getElementById("name").value;
        let surname = document.getElementById("surname").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let credit = document.getElementById("credit").value;
        let province = "MUR";

        const dataToSend = JSON.stringify({"username": username, "name": name, "surname": surname, "email": email, "password": password, "credit": credit, "province": province});
        let dataReceived;

        fetch("http://localhost:8080/register", {
            method: "post",
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
            body: dataToSend
        })
        .then(resp => {
            if (resp.status === 200) {
                return resp.json()
            } else {
                console.log("Status: " + resp.status)
                return Promise.reject("server")
            }
        })
        .then(dataJson => {
            dataReceived = JSON.parse(dataJson)
        })
        .catch(err => {
            if (err === "server") return
            console.log(err)
        })

        console.log(dataReceived);
    });
})

