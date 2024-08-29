<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OfertaController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminProductoController;
use App\Http\Controllers\CarritoController;
use App\Http\Controllers\AdminPedidoController;
use App\Http\Controllers\AdminUsuarioController;
use App\Http\Controllers\AdminEstadisticasController;
use App\Http\Controllers\UserController;

// Ruta para obtener el usuario autenticado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Ruta de mensaje de correo electronico una vez logeado
Route::post('/user/register', [UserController::class, 'register']);

// Rutas de autenticación
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

// Ruta para obtener las ofertas (no requiere autenticación)
Route::get('ofertas', [OfertaController::class, 'index']);

// Ruta para obtener productos de Electrónica
Route::get('/productos/electronica', [\App\Http\Controllers\ProductoController::class, 'getProductosElectronica']);

// Ruta para obtener productos de Beterwere
Route::get('/productos/beterwere', [\App\Http\Controllers\ProductoController::class, 'getProductosBeterwere']);

// Rutas protegidas para usuarios autenticados (clientes)
Route::middleware('auth:sanctum')->group(function () {

    // Rutas del carrito de Electrónica
    Route::get('/carrito/electronica', [CarritoController::class, 'obtenerCarritoElectronica']);
    Route::post('/carrito/electronica', [CarritoController::class, 'agregarProductoCarritoElectronica']);
    Route::delete('/carrito/{id}', [CarritoController::class, 'destroy']);  // Eliminar productos de cualquier carrito

    // Rutas del carrito de Beterwere
    Route::get('/carrito/beterwere', [CarritoController::class, 'obtenerCarritoBeterwere']);
    Route::post('/carrito/beterwere', [CarritoController::class, 'agregarProductoCarritoBeterwere']);

    // Rutas de pedidos separados por categoría
    Route::post('/pedidos/electronica', [CarritoController::class, 'realizarPedidoElectronica']);
    Route::post('/pedidos/beterwere', [CarritoController::class, 'realizarPedidoBeterwere']);

    // Otras rutas del cliente
    Route::get('/pedidos', [\App\Http\Controllers\PedidoController::class, 'index']);
    Route::get('/perfil', [\App\Http\Controllers\UsuarioController::class, 'show']);
    Route::put('/perfil', [\App\Http\Controllers\UsuarioController::class, 'update']);
});

// Rutas del administrador protegidas por middleware 'admin'
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    // Rutas de productos para administrador
    Route::get('/admin/productos', [AdminProductoController::class, 'index']);
    Route::post('/admin/productos', [AdminProductoController::class, 'store']);
    Route::put('/admin/productos/{id}', [AdminProductoController::class, 'update']);
    Route::delete('/admin/productos/{id}', [AdminProductoController::class, 'destroy']);

    // Rutas de usuarios para administrador
    Route::get('/admin/usuarios', [AdminController::class, 'getUsuarios']);
    Route::put('/admin/usuarios/desactivar/{id}', [AdminController::class, 'desactivar']);
    Route::put('/admin/usuarios/activar/{id}', [AdminController::class, 'activar']);

    // Estadísticas
    Route::get('/admin/estadisticas', [AdminEstadisticasController::class, 'index']);

    // Gestión de pedidos del administrador
    Route::get('/admin/pedidos', [AdminPedidoController::class, 'index']);
    Route::get('/admin/pedidos/{id}', [AdminPedidoController::class, 'show']);
    Route::put('/admin/pedidos/{id}/estado', [AdminPedidoController::class, 'updateEstado']);
    Route::delete('/admin/pedidos/{id}', [AdminPedidoController::class, 'destroy']);
});
