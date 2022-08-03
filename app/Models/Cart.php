<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function products(){
        return $this->belongsToMany(Product::class, 'cart_has_products')->withPivot('quantity');
    }

    public function branch(){
        return $this->belongsTo(Branch::class);
    }

}
