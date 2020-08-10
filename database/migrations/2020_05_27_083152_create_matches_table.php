<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchange_offer_id')->unsigned()->unique();
            $table->foreign('exchange_offer_id')->references('id')->on('exchange_offers')->onDelete('cascade');
            $table->bigInteger('exchange_request_id')->unsigned()->unique();
            $table->foreign('exchange_request_id')->references('id')->on('exchange_requests')->onDelete('cascade');
            $table->boolean('awaiting_approval')->default(true);
            $table->boolean('approved')->default(false);
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
        Schema::dropIfExists('matches');
    }
}
