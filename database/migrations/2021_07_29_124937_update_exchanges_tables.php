<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;

class UpdateExchangesTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchange_attempts', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('origin_id')->unsigned()->nullable();
            $table->foreign('origin_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
            $table->text('attempt_type');
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('offer_id')->unsigned()->unique();
            $table->foreign('offer_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
            $table->bigInteger('request_id')->unsigned()->unique();
            $table->foreign('request_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
            $table->string('status');
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
        Schema::dropIfExists('exchange_attempts');
        Schema::dropIfExists('matches');
    }
}
