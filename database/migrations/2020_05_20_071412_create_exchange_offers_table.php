<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangeOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchange_offers', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('active')->default(true);
            $table->string('age');
            $table->string('animal_species');
            $table->string('strain');
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
            $table->text('procedures')->nullable();
            $table->string('protocol_number_known');
            $table->string('protocol_number')->nullable();
            $table->string('amount');
            $table->string('date_available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exchange_offers');
    }
}
