<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ExchangeOffer;
use App\User;
use Faker\Generator as Faker;

$factory->define(ExchangeOffer::class, function (Faker $faker) {
    return [
        "user_id" => User::all()->random()->id,
        "type" => selectRandom(config("validation.type")),
        "animal_species" => selectRandom(config("validation.animal_species")),
        "organs" => selectRandom(config("validation.organs")),
        "strain" => $faker->word(),
        "amount" => rand(0, 100),
        "sex" => selectRandom(config("validation.sex")),
        "storage" => selectRandom(config("validation.storage")),
        "age" => $faker->dateTimeThisYear()->format('Y-m-d'),
        "date_available" => $faker->dateTimeThisMonth()->format('Y-m-d'),
        "origin" => selectRandom(config("validation.origin")),
        "naive" => selectRandom(config("validation.yes_no")),
        "protocol_number" => rand(10000, 99999),
        "spf" => selectRandom(config("validation.spf")),
        "kill_method" => selectRandom(config("validation.kill_method")),
        "extra_info" => $faker->text(140)
    ];
});
