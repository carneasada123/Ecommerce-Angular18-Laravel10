<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Usuario;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    // Pedidos
    public function getPedidos()
    {
        $pedidos = Pedido::all();
        return response()->json($pedidos);
    }

    public function showPedido($id)
    {
        $pedido = Pedido::findOrFail($id);
        return response()->json($pedido);
    }

    public function updatePedido(Request $request, $id)
{
    $pedido = Pedido::findOrFail($id);
    $pedido->estado = $request->estado;

    // Si se asigna una fecha de recogida
    if ($request->has('fecha_recogida') && $pedido->estado === 'fecha asignada') {
        $pedido->fecha_recogida = $request->fecha_recogida;
    }

    $pedido->save();

    return response()->json(['success' => 'Estado del pedido actualizado correctamente.']);
}

    // Usuarios
    public function getUsuarios()
{
    $usuarios = Usuario::where('rol', 'cliente')->get();
    return response()->json($usuarios);
}

     // Desactivar usuario
     public function desactivar($id)
     {
         $usuario = Usuario::findOrFail($id);
         $usuario->estado = false; // Asegúrate de que el campo 'activo' exista en tu tabla usuarios
         $usuario->save();
     
         return response()->json(['success' => 'Usuario desactivado correctamente.']);
     }
     
     public function activar($id)
     {
         $usuario = Usuario::findOrFail($id);
         $usuario->estado = true; // Cambiar el estado a activo
         $usuario->save();
     
         return response()->json(['success' => 'Usuario activado correctamente.']);
     }
    // Estadísticas
    public function getEstadisticas()
    {
        $ventasTotales = Pedido::where('estado', 'entregado')->count();
        $ventasPorCategoria = Producto::select('categoria', \DB::raw('count(*) as total'))
            ->join('pedidos', 'productos.id', '=', 'pedidos.producto_id')
            ->groupBy('categoria')
            ->get();

        return response()->json([
            'ventasTotales' => $ventasTotales,
            'ventasPorCategoria' => $ventasPorCategoria
        ]);
    }
}
