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
            $attempt->specifications()->saveMany($specs);
        });
    }

    public function createRandomDataSet()
    {

        $dateAvailableStart = $this->faker->dateTimeThisMonth()->format('Y-m-d');
        $dateAvailableEnd = $this->faker->dateTimeBetween($dateAvailableStart, '+3 month')->format('Y-m-d');

        $this->randomDataSet = [
            "date_requested" => $this->faker->dateTimeBetween('now', '+30 days')->format('Y-m-d'),
            "type" => $this->selectRandom(config("validation.type")),
            "title" => $this->faker->text(50),
            "description" => $this->faker->text(140),
            "location_building" => $this->faker->address(),
            "location_room" => 'Room ' . $this->faker->buildingNumber,
            "device_type" => $this->selectRandom(config("validation.device_type")),
            "specifications" => $this->faker->text(140),
            "availability_type" => $this->selectRandom(config("validation.availability_type")),
            "substance_category" => $this->faker->word(),
            "substance_details" => $this->faker->text(140),
            "product_producer_number" => rand(10000, 99999),
            "packaging_method" => $this->selectRandom(config("validation.packaging_method")),
            "number" => rand(10000, 99999),
            "volume_weight" => rand(0, 2000),
            "amount" => rand(0, 15),
            "storage" => $this->selectRandom(config("validation.storage")),
            "reason_for_availability" => $this->selectRandom(config("validation.reason_for_availability")),
            "disposable_category" => $this->faker->word(),
            "disposable_details" => $this->faker->text(140),
            "extra_info" => $this->faker->text(140),
            "date_available_start" => $dateAvailableStart,
            "date_available" => $dateAvailableEnd,
            "partial_use" => $this->selectRandom(config("validation.yes_no")),
            "contact_details" => $this->faker->email(),
            "attempt_type" => $this->selectRandom(config("validation.attempt_types")),
            "date_requested" => $dateAvailableStart,
        ];
    }
}
