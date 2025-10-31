<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('client_type', ['GRATUITO', 'BASICO', 'PREMIUM']);
            $table->enum('status', ['PENDENTE', 'CLASSIFICADO'])->default('PENDENTE');
            $table->enum('urgency', ['CRITICA', 'ALTA', 'MEDIA', 'BAIXA'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
