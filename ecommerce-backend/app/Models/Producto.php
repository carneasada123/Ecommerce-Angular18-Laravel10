<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;

    // Campos que pueden ser llenados en la base de datos
    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'cantidad',
        'categoria',
        'oferta',
        'foto',
        'estado',
        'codigo',
    ];

    // Relación muchos a muchos con el modelo Pedido a través de la tabla pivote 'pedido_producto'
    public function pedidos()
    {
        return $this->belongsToMany(Pedido::class, 'pedido_producto')
                    ->withPivot('cantidad');
    }
}
