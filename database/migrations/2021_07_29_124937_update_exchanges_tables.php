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
        Schema::dropIfExists('matches');
        Schema::dropIfExists('exchange_offers');
        Schema::dropIfExists('exchange_requests');
        // // Artisan::call('migrate', array('--path' => 'database/migrations/2020_05_20_071412_create_exchange_offers_table.php', '--force' => true));
        // Artisan::call('migrate', array('--path' => 'database/migrations/2020_05_27_083152_create_matches_table.php', '--force' => true));

        Schema::create('exchanges', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->bigInteger('origin_id')->unsigned()->nullable();
            $table->foreign('origin_id')->references('id')->on('exchanges')->onDelete('cascade');
            $table->text('exchange_type');
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('matches', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('exchange_offer_id')->unsigned()->unique();
            $table->foreign('exchange_offer_id')->references('id')->on('exchanges')->onDelete('cascade');
            $table->bigInteger('exchange_request_id')->unsigned()->unique();
            $table->foreign('exchange_request_id')->references('id')->on('exchanges')->onDelete('cascade');
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
        Artisan::call('migrate', array('--path' => 'database/migrations/2020_05_20_072206_create_exchange_requests_table.php', '--force' => true));
        Artisan::call('migrate', array('--path' => 'database/migrations/2020_05_20_071412_create_exchange_offers_table.php', '--force' => true));
        Artisan::call('migrate', array('--path' => 'database/migrations/2020_05_27_083152_create_matches_table.php', '--force' => true));
    }
}
