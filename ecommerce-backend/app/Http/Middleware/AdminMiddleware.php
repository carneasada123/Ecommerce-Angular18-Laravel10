<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle($request, Closure $next)
    {
        // Verificar si el usuario está autenticado y si tiene el rol de administrador
        if (Auth::check() && Auth::user()->rol === 'admin') {
            return $next($request);
        }

        // Si no es administrador, devolver error 403 (Prohibido)
        return response()->json(['error' => 'No autorizado'], 403);
    }
}