@extends('layouts.app')
@section('content')
    <div class="container">
        <div id="agenda">
            Calendario
        </div>
    </div>

    <!-- Modal trigger button -->
    <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#evento">
        Launch
    </button>
    
    <!-- Modal Body -->
    <div class="modal fade" id="evento" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        Modal title
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        {!! csrf_field() !!}
                        <div class="mb-3">
                            <label for="" class="form-label">ID:</label>
                            <input  type="text" class="form-control" id="id" name="id"  aria-describedby="helpId" placeholder="">
                        </div>
                        <div class="mb-3">
                            <label for="title" class="form-label">Titulo</label>
                            <input type="text" class="form-control" name="title" id="title" aria-describedby="helpId" placeholder="Escribe el nombre del evento"/>
                        </div>
                        <div class="mb-3">
                            <label for="descripcion" class="form-label">Descripción</label>
                            <textarea class="form-control" name="descripcion" id="descripcion" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="start" class="form-label">Start</label>
                            <input type="date" class="form-control" name="start" id="start" aria-describedby="helpId" placeholder=""/>
                        </div>
                        <div>
                            <div class="mb-3">
                                <label for="" class="form-label">End</label>
                                <input type="date" class="form-control" name="end" id="end" aria-describedby="helpId" placeholder=""/>
                            </div>
                            
                        </div>
                    </form>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" id="btnGuardar">Guardar</button>
                    <button type="button" class="btn btn-warning" id="btnModificar">Modificar</button>
                    <button type="button" class="btn btn-danger" id="btnEliminar">Eliminar</button>

                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Optional: Place to the bottom of scripts -->
    <script>
        const myModal = new bootstrap.Modal(
            document.getElementById("evento"),
        );
    </script>
    
@endsection