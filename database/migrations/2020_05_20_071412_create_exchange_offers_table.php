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
            $table->bigInteger('origin_id')->unsigned()->nullable();
            $table->foreign('origin_id')->references('id')->on('exchange_offers')->onDelete('cascade');
            $table->boolean('active')->default(true);
            $table->text('type');
            $table->text('animal_species');
            $table->text('organs')->nullable();
            $table->text('date_available')->nullable();
            $table->text('strain');
            $table->text('amount');
            $table->text('age');
            $table->text('sex')->nullable();
            $table->text('origin')->nullable();
            $table->text('naive')->nullable();
            $table->text('protocol_number')->nullable();
            $table->text('spf')->nullable();
            $table->text('storage')->nullable();
            $table->text('kill_method')->nullable();
            $table->text('extra_info')->nullable();
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
