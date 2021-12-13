<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ExchangeAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\ExchangeAttempt::factory()->count(50)->create();
    }
}
