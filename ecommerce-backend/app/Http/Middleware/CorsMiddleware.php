<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Definir el origen permitido (frontend Angular en localhost)
        $allowedOrigins = ['http://localhost:4200'];

        if (in_array($request->headers->get('Origin'), $allowedOrigins)) {
            $origin = $request->headers->get('Origin');
        } else {
            $origin = '*'; // Podrías definir esto de manera más estricta según el entorno
        }

        // Si es una solicitud preflight (OPTIONS)
        if ($request->getMethod() === "OPTIONS") {
            return response('', 200)
                ->header('Access-Control-Allow-Origin', $origin)
                ->header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
                ->header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application')
                ->header('Access-Control-Allow-Credentials', 'true');
        }

        // Para otras solicitudes
        $response = $next($request);
        
        // Configurar los encabezados CORS
        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, X-Requested-With, Application');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}

