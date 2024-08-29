<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class VerificarRol
{
    public function handle($request, Closure $next, $rol)
    {
        if (!Auth::check() || Auth::user()->rol !== $rol) {
            return redirect('/');
        }
        return $next($request);
    }
}
