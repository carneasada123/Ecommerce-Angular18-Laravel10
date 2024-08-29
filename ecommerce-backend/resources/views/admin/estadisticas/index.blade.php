@extends('layouts.admin')

@section('content')
<div class="container">
    <h1>Estadísticas</h1>

    <div class="card">
        <div class="card-header">
            Ventas Totales
        </div>
        <div class="card-body">
            <h5 class="card-title">Total de Ventas: {{ $ventasTotales }}</h5>
        </div>
    </div>

    <div class="card mt-4">
        <div class="card-header">
            Ventas por Categoría
        </div>
        <div class="card-body">
            <ul>
                @foreach($ventasPorCategoria as $categoria)
                    <li>{{ $categoria->categoria }}: {{ $categoria->total }}</li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
@endsection
