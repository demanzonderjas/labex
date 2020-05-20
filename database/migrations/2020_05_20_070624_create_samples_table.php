<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSamplesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('samples', function (Blueprint $table) {
            $table->id();
            $table->string('animal_species');
            $table->string('tribe');
            $table->string('gender');
            $table->string('weight_type')->nullable();
            $table->string('weight')->nullable();
            $table->string('origin');
            $table->string('spf');
            $table->text('microbiome')->nullable();
            $table->string('organs')->nullable();
            $table->string('storage')->nullable();
            $table->string('naive');
            $table->string('inconvenience_level')->nullable();
            $table->string('kill_method')->nullable();
            $table->string('sample_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('samples');
    }
}
