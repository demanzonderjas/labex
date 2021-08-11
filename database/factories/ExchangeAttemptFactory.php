<?php

namespace Database\Factories;

use App\ExchangeAttempt;
use App\Specification;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\User;

class ExchangeAttemptFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = ExchangeAttempt::class;

    protected $randomDataSet = [];


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
            "user_id" => User::all()->random(),
            "attempt_type" => $this->selectRandom(config("validation.attempt_types")),
            "status" => 'active',
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function (ExchangeAttempt $attempt) {
            $this->createRandomDataSet();
            $specs = [];
            foreach (config('validation.exchange_attempt_fields') as $fieldId => $validation) {
                $specs[] = new Specification([
                    'key' => $fieldId,
                    'value' => $this->randomDataSet[$fieldId]
                ]);
            }
            foreach (config('validation.exchange_attempt_' . $attempt->attempt_type . '_fields') as $fieldId => $validation) {
                $specs[] = new Specification([
                    'key' => $fieldId,
                    'value' => $this->randomDataSet[$fieldId]
                ]);
            };
            $attempt->specifications()->saveMany($specs);
        });
    }

    public function createRandomDataSet()
    {
        $this->randomDataSet = [
            "date_requested" => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            "age_type" => $this->selectRandom(config("validation.age_type")),
            "age_min" => rand(0, 5),
            "age_max" => rand(6, 20),
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
            "sample_number" => rand(10000, 99999),
            "spf" => $this->selectRandom(config("validation.spf")),
            "kill_method" => $this->selectRandom(config("validation.kill_method")),
            "suitable_for_adoption" => $this->selectRandom(config("validation.yes_no")),
            "location" => $this->faker->city(),
            "extra_info" => $this->faker->text(140)
        ];
    }
}
