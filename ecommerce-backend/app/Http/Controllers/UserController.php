<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Mail\UserRegistered;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $userData = $request->only(['nombre', 'direccion', 'telefono']);

        // Lógica de registro de usuario aquí (guardar en base de datos, etc.)

        // Enviar correo
        Mail::to('ratap4123@gmail.com')->send(new UserRegistered($userData));

        return response()->json(['message' => 'Usuario registrado y correo enviado correctamente.'], 200);
    }
}
