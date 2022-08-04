<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->enum('type', ['delivery', 'pickup']);
            $table->enum('status', ['unpaid', 'processing', 'completed', 'cancelled'])->default('unpaid');
            $table->string('notes')->nullable();
            $table->string('address')->nullable();
            $table->string('phone')->nullable();
            $table->integer('totalPrice')->default(0);
            $table->string('paymentId')->nullable();

            $table->foreignId('user_id')->nullable();
            $table->foreignId('branch_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
};
