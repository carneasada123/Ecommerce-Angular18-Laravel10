<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Carrito;
use App\Models\Producto;
use App\Mail\PedidoCreado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class CarritoController extends Controller
{
    // Obtener carrito de electrónica
    public function obtenerCarritoElectronica()
    {
        $user = Auth::user();
        $carrito = Carrito::where('usuarios_id', $user->id)
                          ->where('categoria', 'electronica')
                          ->with('producto')
                          ->get();
        return response()->json($carrito);
    }

    // Obtener carrito de beterwere
    public function obtenerCarritoBeterwere()
    {
        $user = Auth::user();
        $carrito = Carrito::where('usuarios_id', $user->id)
                          ->where('categoria', 'beterwere')
                          ->with('producto')
                          ->get();
        return response()->json($carrito);
    }

    // Agregar producto al carrito de electrónica
    public function agregarProductoCarritoElectronica(Request $request)
    {
        return $this->agregarProductoCarrito($request, 'electronica');
    }

    // Agregar producto al carrito de beterwere
    public function agregarProductoCarritoBeterwere(Request $request)
    {
        return $this->agregarProductoCarrito($request, 'beterwere');
    }

    // Lógica compartida para agregar productos al carrito
    private function agregarProductoCarrito(Request $request, $categoria)
    {
        $request->validate([
            'producto_id' => 'required|exists:productos,id',
            'cantidad' => 'required|integer|min:1',
        ]);

        $user = Auth::user();
        $producto = Producto::find($request->producto_id);

        // Verificar si el producto ya está en el carrito
        $carritoItem = Carrito::where('usuarios_id', $user->id)
                              ->where('producto_id', $request->producto_id)
                              ->where('categoria', $categoria)
                              ->first();

        if ($carritoItem) {
            $carritoItem->cantidad += $request->cantidad;
            $carritoItem->save();
        } else {
            $carritoItem = new Carrito();
            $carritoItem->usuarios_id = $user->id;
            $carritoItem->producto_id = $request->producto_id;
            $carritoItem->cantidad = $request->cantidad;
            $carritoItem->categoria = $categoria;
            $carritoItem->save();
        }

        return response()->json(['success' => "Producto agregado al carrito de $categoria correctamente."]);
    }

    // Realizar pedido de electrónica
    public function realizarPedidoElectronica(Request $request)
    {
        return $this->realizarPedido($request, 'electronica');
    }

    // Realizar pedido de beterwere
    public function realizarPedidoBeterwere(Request $request)
    {
        return $this->realizarPedido($request, 'beterwere');
    }

    // Lógica compartida para realizar pedidos por categoría
    private function realizarPedido(Request $request, $categoria)
    {
        $user = Auth::user();
        $request->validate(['tipo_pago' => 'required|string']);

        $carritoItems = Carrito::where('usuarios_id', $user->id)
                                ->where('categoria', $categoria)
                                ->with('producto')
                                ->get();

        if ($carritoItems->isEmpty()) {
            return response()->json(['error' => 'El carrito está vacío'], 400);
        }

        // Crear el pedido
        $pedido = Pedido::create([
            'usuario_id' => $user->id,
            'estado' => 'en proceso',
            'tipo_pago' => $request->tipo_pago,
        ]);

        // Asociar productos con el pedido
        foreach ($carritoItems as $item) {
            $pedido->productos()->attach($item->producto_id, ['cantidad' => $item->cantidad]);
        }

        // Vaciar el carrito
        Carrito::where('usuarios_id', $user->id)
               ->where('categoria', $categoria)
               ->delete();

        // Cargar las relaciones necesarias para el correo
        $pedido = Pedido::with('productos', 'usuario')->find($pedido->id);

        if (!$pedido || !$pedido->usuario || $pedido->productos->isEmpty()) {
            \Log::error('Error: Pedido, usuario o productos no encontrados.');
            return response()->json(['error' => 'Error al procesar el pedido.'], 500);
        }

        // Enviar correo de confirmación del pedido
        try {
            Mail::to($user->email)->send(new PedidoCreado($pedido));
        } catch (\Exception $e) {
            \Log::error('Error al enviar el correo de confirmación: ' . $e->getMessage());
            return response()->json(['error' => 'Pedido creado, pero ocurrió un error al enviar el correo.'], 500);
        }

        return response()->json(['success' => "Pedido de $categoria realizado con éxito y correo enviado."]);
    }
}
