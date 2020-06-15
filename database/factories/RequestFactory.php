<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\ExchangeRequest;
use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

function selectRandom($arr)
{
    $randomIndex = array_rand($arr);
    return $arr[$randomIndex];
}

$factory->define(ExchangeRequest::class, function (Faker $faker) {


    return [
        "user_id" => User::first()->id,
        "type" => selectRandom(config("validation.type")),
        "animal_species" => selectRandom(config("validation.animal_species")),
        "organs" => selectRandom(config("validation.organs")),
        "amount" => rand(0, 100),
        "sex" => selectRandom(config("validation.sex")),
        "origin" => selectRandom(config("validation.origin")),
        "spf" => selectRandom(config("validation.spf")),
    ];
});
