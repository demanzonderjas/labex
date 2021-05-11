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
            $table->bigInteger('origin_id')->unsigned()->nullable();
            $table->foreign('origin_id')->references('id')->on('exchange_requests')->onDelete('cascade');
            $table->boolean('active')->default(true);
            $table->text('type')->nullable();
            $table->text('animal_species')->nullable();
            $table->text('organs')->nullable();
            $table->text('strain')->nullable();
            $table->text('amount')->nullable();
            $table->text('sex')->nullable();
            $table->text('storage')->nullable();
            $table->text('age_type')->nullable();
            $table->text('age_min')->nullable();
            $table->text('age_max')->nullable();
            $table->text('spf')->nullable();
            $table->text('date_requested')->nullable();
            $table->text('origin')->nullable();
            $table->text('kill_method')->nullable();
            $table->text('extra_info')->nullable();
            $table->text('protocol_number')->nullable();
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
