<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'price' => $this->faker->randomFloat(2, 0, 100),
            'isArchived' => $this->faker->boolean,

        ];
    }

    public function configure()
    {
        return $this->afterMaking(function (Product $product) {

        })->afterCreating(function (Product $product) {

//get random category
            $category = Category::inRandomOrder()->first();
            //add random category to product

            $product->categories()->attach($category);
            $product->save();

        });
    }

}
