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
        dateClick: function(info) {
            $("#evento").modal("show");
        }
    });

    calendar.render();

    document.getElementById("btnGuardar").addEventListener("click", function(){
        const datos = new FormData(formulario);
        console.log(datos);

        axios.post("http://localhost/agenda/public/evento/agregar", datos)
        .then((response)=>{
            $("#evento").modal("hide");
        }).catch(error=>{
            if(error.response){
                console.log(error.response.data);
            }
        })
    });

});