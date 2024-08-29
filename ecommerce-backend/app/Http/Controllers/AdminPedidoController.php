<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class AdminPedidoController extends Controller
{
    /**
     * Mostrar todos los pedidos.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Obtener todos los pedidos, incluyendo la información de usuario y productos relacionados
        $pedidos = Pedido::with('usuario', 'productos')->get();
        
        return response()->json($pedidos);
    }

    /**
     * Mostrar los detalles de un pedido específico por su ID.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // Buscar un pedido específico por su ID
        $pedido = Pedido::with('usuario', 'productos')->findOrFail($id);
        
        return response()->json($pedido);
    }

    /**
     * Actualizar el estado de un pedido.
     * 
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateEstado(Request $request, $id)
    {
        // Validar los datos recibidos
        $request->validate([
            'estado' => 'required|string',
            'fecha_entrega' => 'nullable|date'
        ]);

        // Encontrar el pedido por su ID
        $pedido = Pedido::findOrFail($id);

        // Actualizar el estado del pedido
        $pedido->estado = $request->estado;

        // Si el estado es "fecha asignada", asignar la fecha de entrega
        if ($request->estado === 'fecha asignada' && $request->has('fecha_entrega')) {
            $pedido->fecha_entrega = $request->fecha_entrega;
        }

        // Guardar los cambios
        $pedido->save();

        return response()->json(['success' => 'Estado del pedido actualizado correctamente.']);
    }

    /**
     * Eliminar un pedido por su ID.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        // Buscar el pedido por su ID
        $pedido = Pedido::findOrFail($id);

        // Eliminar el pedido
        $pedido->delete();

        return response()->json(['success' => 'Pedido eliminado correctamente.']);
    }
}
