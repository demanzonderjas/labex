<?php

namespace Database\Factories;

use App\ExchangeRequest;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\User;

class ExchangeRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ExchangeRequest::class;


    protected function selectRandom($arr)
    {
        $randomIndex = array_rand($arr);
        return $arr[$randomIndex];
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            "user_id" => User::where('id', '2')->first(),
            "type" => $this->selectRandom(config("validation.type")),
            "animal_species" => $this->selectRandom(config("validation.animal_species")),
            "organs" => $this->selectRandom(config("validation.organs")) . ", " . $this->selectRandom(config("validation.organs")),
            "amount" => rand(0, 100),
            "date_requested" => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            "age_type" => $this->selectRandom(config("validation.age_type")),
            "age_min" => rand(0, 5),
            "age_max" => rand(6, 20),
            "sex" => $this->selectRandom(config("validation.sex")),
            "origin" => $this->selectRandom(config("validation.origin")),
            "spf" => $this->selectRandom(config("validation.spf")),
            "protocol_number" => rand(10000, 99999),
        ];
    }
}
