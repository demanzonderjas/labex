<?php

namespace Database\Factories;

use App\ExchangeOffer;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\User;

class ExchangeOfferFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ExchangeOffer::class;


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
            "user_id" => User::where('id', '1')->first(),
            "type" => $this->selectRandom(config("validation.type")),
            "animal_species" => $this->selectRandom(config("validation.animal_species")),
            "organs" => $this->selectRandom(config("validation.organs")) . ", " . $this->selectRandom(config("validation.organs")),
            "strain" => $this->faker->word(),
            "amount" => rand(0, 100),
            "sex" => $this->selectRandom(config("validation.sex")),
            "storage" => $this->selectRandom(config("validation.storage")),
            "age" => $this->faker->dateTimeThisYear()->format('Y-m-d'),
            "date_available" => $this->faker->dateTimeThisMonth()->format('Y-m-d'),
            "origin" => $this->selectRandom(config("validation.origin")),
            "naive" => $this->selectRandom(config("validation.yes_no")),
            "protocol_number" => rand(10000, 99999),
            "spf" => $this->selectRandom(config("validation.spf")),
            "kill_method" => $this->selectRandom(config("validation.kill_method")),
            "extra_info" => $this->faker->text(140)
        ];
    }
}
