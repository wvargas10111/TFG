$(document).ready(function () {

    $("button").prop('disabled', true); //El botón comienza desactivado

    $(".categoria input").click(seleccionarCategoria);
    $(".tipo input").click(actualizarUrl);
    $(".flag input").click(actualizarUrl);
    $("button").click(consulta);


});

var categoriaSeleccionada = false;//Nos indica si hay algún elemento seleccionado en categoria
var tipoSeleccionado = false;//Nos indica si hay algún elemento seleccionado en tipo

var miUrl = "https://sv443.net/jokeapi/v2/joke/";//Aquí guardaremos la url de la api, la cual variará en función del tipo de chiste elegido


//Realiza la consulta a la API y pone la información en pantalla
function consulta() {

    $.ajax({
        type: "GET",
        url: miUrl,
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            var tipo = data.type;
            
            //Vacíamos el chiste anterior
            $("#setup").text("")
            $("#delivery").text("")
            if (!tipo.localeCompare("single")) {
                document.getElementById("chiste").innerHTML = "<p>" + data.joke + "</p>";
            } else {
                document.getElementById("chiste").innerHTML = "<p>" + data.setup + "</p><p>" + data.delivery + "</p>";

            }

        }
    });
}

//Controla la selección de la categoría
function seleccionarCategoria() {

    if ($(this).val() == "Any") {//Si pulsa la categoría any, las otras se deben desmarcar y viceversa

        $('.categoria input:checkbox:checked').each(function () {
            if ($(this).val() != "Any") {//para que no desmarque any
                $(this).prop("checked", false);
            }

        });
    } else {
        $("#any").prop("checked", false);
    }


    actualizarUrl();
}



//habilita el botón o no en función si hay categoria y tipo seleccionado o no
function activarBoton() {
    if (tipoSeleccionado && categoriaSeleccionada) {
        $("button").prop('disabled', false);
    } else {
        $("button").prop('disabled', true);
    }
}


//Actualiza la url en función de las opciones seleccionadas y controla si el botón está activo o no
function actualizarUrl() {

    miUrl = "https://sv443.net/jokeapi/v2/joke/";//Dejamos la url como al principio

    actalizarUrlCategoria();

    actualizarUrlFlag();

    actualizarUrlTipo();

    activarBoton();
}

//pone la primera parte de la url
function actalizarUrlCategoria() {
    categoriaSeleccionada = false;
    $('.categoria input:checkbox:checked').each(function () {//Si entra aquí es que hay algún elemento seleccionado

        if ($(this).val() != "Any") {
            miUrl += $(this).val() + ",";
        } else {
            miUrl += $(this).val();
        }

        categoriaSeleccionada = true;//Si ha entrado aquí es que hay algún elemento seleccionado

    });

    //Quitamos la última coma si la hay
    if (!miUrl.substring(miUrl.length - 1, miUrl.length).localeCompare(",")) {
        miUrl = miUrl.substring(0, miUrl.length - 1);
    }
}

//Ponemos la segunda parte de la url
function actualizarUrlFlag() {
    //le añadimos "?blacklistFlags="
    miUrl += "?blacklistFlags=";

    $('.flag input:checkbox:checked').each(function () {//Si entra aquí es que hay algún elemento seleccionado

        miUrl += $(this).val() + ",";

    });

    //Quitamos la última coma si la hay
    if (!miUrl.substring(miUrl.length - 1, miUrl.length).localeCompare(",")) {
        miUrl = miUrl.substring(0, miUrl.length - 1);
    }
}


//Ponemos la tercera parte de la url
function actualizarUrlTipo() {
    //Si no hay flag seleccionada quitamos "?blacklistFlags", también añadimos type en funciom de si hay flag o no
    if (!miUrl.substring(miUrl.length - 16, miUrl.length).localeCompare("?blacklistFlags=")) {
        miUrl = miUrl.substring(0, miUrl.length - 16);
        miUrl += "?type=";
    } else {
        miUrl += "&type=";
    }

    var contador = 0;
    tipoSeleccionado = false;
    $('.tipo input:checkbox:checked').each(function () {//Si entra aquí es que hay algún elemento seleccionado

        tipoSeleccionado = true;
        contador++;
    });

    if (contador == 1) {//Si el contador no es 1, quiere decir que acepta cualquier tipo de chistes, entonces no hay que poner tipo
        miUrl += $('.tipo input:checkbox:checked').val();
    } else {
        miUrl = miUrl.substring(0, miUrl.length - 6);
    }
}


