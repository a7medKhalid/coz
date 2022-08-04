<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];


    //order_has_products relationship
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_has_products')->withPivot('quantity');
    }
}
