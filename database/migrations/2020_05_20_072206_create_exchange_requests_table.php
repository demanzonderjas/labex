<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExchangeRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('exchange_requests', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->boolean('active')->default(true);
            $table->string('type');
            $table->string('animal_species')->nullable();
            $table->string('organs')->nullable();
            $table->string('strain')->nullable();
            $table->string('amount')->nullable();
            $table->string('sex')->nullable();
            $table->string('storage')->nullable();
            $table->string('age_type')->nullable();
            $table->string('age_min')->nullable();
            $table->string('age_max')->nullable();
            $table->string('spf')->nullable();
            $table->string('date_requested')->nullable();
            $table->string('origin')->nullable();
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
        Schema::dropIfExists('exchange_requests');
    }
}
