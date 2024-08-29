<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens; 
class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'direccion',
        'telefono',
        'celular',
        'email',
        'password',
        'rol',
        'estado'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function pedidos()
    {
        return $this->hasMany(Pedido::class);
    }
}
