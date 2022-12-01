<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAdoptionInfoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('adoption_info', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('offer_id')->unsigned();
            $table->foreign('offer_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
            $table->string('code');
            $table->integer('amount');
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
        Schema::dropIfExists('adoption_info');
    }
}
