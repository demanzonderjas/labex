<?php

use App\FaqCategory;
use App\FaqItem;
use Illuminate\Database\Seeder;

class FaqItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faqItems = [
            [
                "category" => "Security",
                "title" => "Is the information being exchanged sufficiently secure?",
            ],
            [
                "category" => "Privacy",
                "title" => "Which target groups are allowed to use this online platform?",
            ],
            [
                "category" => "Matches",
                "title" => "Do I have to delete my offer myself if it is no longer available?",
            ],
            [
                "category" => "Matches",
                "title" => "How do I know that the offer stated in the application is still available?",
            ],
            [
                "category" => "Privacy",
                "title" => "Are the legal requirements of the Experiments on Animals Act WoD) and the General Data Protection Regulation (AVG) taken into account, and if so how?",
            ],
            [
                "category" => "Matches",
                "title" => "Why do I see matches below 100%?",
            ],
            [
                "category" => "Matches",
                "title" => "What happens when a match is partial (in amount/organs)",
                "content" => "",
                "show" => true
            ],
            [
                "category" => "Matches",
                "title" => "How does the matching of offers and requests work?",
            ],
            [
                "category" => "Matches",
                "title" => "How do I stay up to date with the status of the match?",
            ],
            [
                "category" => "Matches",
                "title" => "I created the wrong match by accident, what should I do now?",
            ],
            [
                "category" => "Privacy",
                "title" => "What data of my profile do you store?",
            ],
            [
                "category" => "Privacy",
                "title" => "How do I get the contact-info of my match?",
            ],
            [
                "category" => "General",
                "title" => "Who can I contact for feedback/questions about ATEX?",
            ],
            [
                "category" => "General",
                "title" => "What does ATEX do?",
            ],
            [
                "category" => "Other",
                "title" => "How is the safety of the biomaterial?",
            ],
            [
                "category" => "Other",
                "title" => "How does it work with the ownership of the animals/tissues?",
            ],
        ];

        foreach ($faqItems as $item) {
            $f = new FaqItem();
            $f->faq_category_id = FaqCategory::where('name', $item['category'])->first()->id;
            $f->title = $item["title"];
            $f->content = "";
            $f->show = true;
            $f->save();
        }
    }
}
