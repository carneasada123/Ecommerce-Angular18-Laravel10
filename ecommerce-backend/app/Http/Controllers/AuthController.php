<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Credenciales Incorrectas'],
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'usuario' => $user]);
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:15',
            'celular' => 'nullable|string|max:15',
            'email' => 'required|string|email|max:255|unique:usuarios',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $usuario = Usuario::create([
            'nombre' => $validatedData['nombre'],
            'direccion' => $validatedData['direccion'],
            'telefono' => $validatedData['telefono'],
            'celular' => $validatedData['celular'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'rol' => 'cliente',
            'estado' => true,
        ]);

        $token = $usuario->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token, 'usuario' => $usuario]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Cerraste Sesion']);
    }
}
