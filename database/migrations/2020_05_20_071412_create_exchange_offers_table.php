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
            $table->string('type');
            $table->string('animal_species');
            $table->string('organs')->nullable();
            $table->string('date_available')->nullable();
            $table->string('strain');
            $table->string('amount');
            $table->string('age');
            $table->string('sex');
            $table->string('origin')->nullable();
            $table->string('naive');
            $table->string('protocol_number')->nullable();
            $table->string('spf')->nullable();
            $table->string('storage')->nullable();
            $table->string('kill_method')->nullable();
            $table->string('extra_info')->nullable();
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
