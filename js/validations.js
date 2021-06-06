function validation() {
    var name, mail, phone, expresion;
    name = document.getElementById("name").value;
    mail = document.getElementById("mail").value;
    phone = document.getElementById("phone").value;
    expresion = /\w+@\w+\.+[a-z]/;

    if (name === "" || mail === "" || phone === "") {
        alert("Todos los campos han de ser rellenados.");
        return false;

    } else if (isNaN(phone)) {
        alert("El teléfono ingresado o alguno de sus caracteres no es un número.")
        return false;
    } else if (!expresion.test(mail)) {
        alert("El correo no es valido");
        return false;
    }
}