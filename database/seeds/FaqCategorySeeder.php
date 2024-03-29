<?php

use App\FaqCategory;
use Illuminate\Database\Seeder;

class FaqCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ["General", "Matches", "Privacy", "Security", "Other"];

        foreach ($categories as $category) {
            $c = new FaqCategory();
            $c->name = $category;
            $c->save();
        }
    }
}
