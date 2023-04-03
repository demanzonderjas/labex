<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveUniqueConstraintFromMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->dropForeign('matches_offer_id_foreign');
            $table->dropUnique('matches_offer_id_unique');
            $table->dropForeign('matches_request_id_foreign');
            $table->dropUnique('matches_request_id_unique');

            $table->foreign('offer_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
            $table->foreign('request_id')->references('id')->on('exchange_attempts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('matches', function (Blueprint $table) {
            $table->unique('offer_id')->unique();
            $table->unique('request_id');
        });
    }
}
