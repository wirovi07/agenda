import axios from "axios";

document.addEventListener('DOMContentLoaded', function () {

    let formulario = document.querySelector("form");

    var calendarEl = document.getElementById('agenda');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale:"es",
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        //Mostrar
        events: 'http://localhost/agenda/public/evento/mostrar',

        dateClick: function(info) {
            formulario.reset();

            formulario.start.value = info.dateStr;
            formulario.end.value = info.dateStr;

            $("#evento").modal("show");
        },
        eventClick: function(info) {
            var evento = info.event;
            console.log(evento);

            //Editar datos a la DB
            axios.post("http://localhost/agenda/public/evento/editar/"+info.event.id)
            .then((response)=>{

                formulario.id.value = response.data.id;
                formulario.title.value = response.data.title;
                formulario.descripcion.value = response.data.descripcion;
                formulario.start.value = response.data.start;
                formulario.end.value = response.data.end;

                $("#evento").modal("show");
            }).catch(error=>{
                if(error.response){
                    console.log(error.response.data);
                }
            })
        }
    });

    calendar.render();

    document.getElementById("btnGuardar").addEventListener("click", function(){
        const datos = new FormData(formulario);
        console.log(datos);

        //Agregar datos a la DB
        axios.post("http://localhost/agenda/public/evento/agregar", datos)
        .then((response)=>{
            calendar.refetchEvents(); //Actualizar los eventos de la URL 
            $("#evento").modal("hide");
        }).catch(error=>{
            if(error.response){
                console.log(error.response.data);
            }
        })
    });

});