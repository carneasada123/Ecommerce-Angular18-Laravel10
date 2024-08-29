<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;

class AdminSeeder extends Seeder
{
    public function run()
    {
        Usuario::create([
            'nombre' => 'Fernando Gomez Paz',
            'direccion' => 'Dirección Admin',
            'telefono' => '99999999',
            'celular' => '99999999',
            'email' => 'gp@gmail.com',
            'password' => Hash::make('admin123'),
            'rol' => 'admin',
            'estado' => true,
        ]);
    }
}
