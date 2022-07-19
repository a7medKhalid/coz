<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function manager(){
        return $this->belongsTo(User::class, 'user_id');
    }

    public function inventory(){
        return $this->belongsToMany(Product::class, 'branch_has_products');
    }

//    public function inventory(){
//        return $this->hasMany(BranchHasProduct::class);
//    }
}
