import axios from "axios";

document.addEventListener('DOMContentLoaded', function () {

    let formulario = document.querySelector("#formularioEventos");

    var calendarEl = document.getElementById('agenda');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: "es",
        displayEventTime: false,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },

        events: {
            url: baseURL+'/evento/mostrar',
            method: "POST",
            extraParams: {
                _token: formulario._token.value,
            }
                
        },

        //Mostrar

        dateClick: function (info) {
            formulario.reset();

            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;

            $("#evento").modal("show");
        },
        eventClick: function (info) {
            var evento = info.event;
            console.log(evento);

            //Editar datos a la DB
            axios.post(baseURL+"/evento/editar/" + info.event.id)
                .then((response) => {

                    formulario.id.value = response.data.id;
                    formulario.title.value = response.data.title;
                    formulario.descripcion.value = response.data.descripcion;
                    formulario.start.value = response.data.start;
                    formulario.end.value = response.data.end;

                    $("#evento").modal("show");
                }).catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                })
        }
    });

    calendar.render();

    //Agregar datos a la DB
    document.getElementById("btnGuardar").addEventListener("click", function () {

        enviarDatos("/evento/agregar")

    });

    //Eliminar datos a la DB
    document.getElementById("btnEliminar").addEventListener("click", function () {

        enviarDatos("/evento/borrar/" + formulario.id.value)

    });

    //Modificar datos a la DB
    document.getElementById("btnModificar").addEventListener("click", function () {

        enviarDatos("/evento/actualizar/" + formulario.id.value)

    });


    function enviarDatos(url) {
        const datos = new FormData(formulario);

        const nuevaURL = baseURL+url;

        axios.post(nuevaURL, datos)
            .then((response) => {
                calendar.refetchEvents(); //Actualizar los eventos de la URL 
                $("#evento").modal("hide");
            }).catch(error => {
                if (error.response) {
                    console.log(error.response.data);
                }
            })
    }



});