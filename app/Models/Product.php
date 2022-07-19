<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Product extends Model implements HasMedia
{
    use InteractsWithMedia;
    use HasFactory;


    protected $guarded = [];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'product_has_categories');
    }

    public function inventory(){
        return $this->belongsToMany(Branch::class, 'branch_has_products')->withPivot('quantity');
    }

}
