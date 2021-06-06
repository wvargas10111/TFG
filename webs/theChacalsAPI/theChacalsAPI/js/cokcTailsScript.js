

function to_string(string) {
            return JSON.stringify(string, null, "\t")
        }

        $(document).ready(function() {
            var resultadoLlamada = null

            $.ajax({ 
                type: "GET",
                url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
                crossDomain: true,
                dataType: 'json',
                success: function(data) {

                    $("#jsonRaw").text(to_string(data));

                    var bebida = data["drinks"][0]  

                    $("#name").text(bebida["strDrink"]);
                    $("#image").attr("src", bebida["strDrinkThumb"])
                    $("#instructions").text(bebida["strInstructions"]) 
                    $("#alcohol").text(bebida["strAlcoholic"])

                    $.each(bebida, function(clave, valor) {

                        document.getElementById("jsonKeys").innerHTML += "<li class='list-group-item'>" + clave + "</li>";

                        if (clave != null) {
                            //alert(clave + ": " + valor)
                        }
                    });
                }
            });
        });

