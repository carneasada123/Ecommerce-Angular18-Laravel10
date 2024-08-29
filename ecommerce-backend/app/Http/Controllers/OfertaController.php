<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class OfertaController extends Controller
{
    public function index()
    {
        try {
            $ofertas = Producto::where('oferta', true)->get();
            return response()->json($ofertas);
        } catch (\Exception $e) {
            \Log::error('Error al obtener las ofertas: ' . $e->getMessage());
            return response()->json(['error' => 'Error al obtener las ofertas'], 500);
        }
    }
}
