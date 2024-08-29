<?php

namespace App\Models;  // Asegúrate de que el namespace sea correcto

use Illuminate\Database\Eloquent\Model;  // Importa la clase base Model de Laravel
use Illuminate\Database\Eloquent\Factories\HasFactory;  // Importa el trait HasFactory

class Pedido extends Model
{
    use HasFactory;  // Habilita las fábricas de modelos

    // Define los campos que pueden ser llenados mediante asignación masiva
    protected $fillable = [
        'usuario_id', 'tipo_pago', 'estado', 'fecha_entrega' 
    ];

    // Relación "muchos a uno" con el modelo Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class);  // Un pedido pertenece a un usuario
    }

    // Relación "muchos a muchos" con el modelo Producto a través de la tabla pivote 'pedido_producto'
    public function productos()
    {
        return $this->belongsToMany(Producto::class, 'pedido_producto')
                    ->withPivot('cantidad');  // Agrega el campo 'cantidad' desde la tabla pivote
    }
}
