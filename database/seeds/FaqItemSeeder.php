<?php

namespace Database\Seeders;

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
                "title" => "What cookies are stored/used?",
                "content" => "To be as privacy-friendly as possible, we only store the cookies required to keep you logged in while you navigate between pages. There are no analytical cookies, no marketing cookies and no other third party cookies."
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
                "content" => "<p> This platform is provided and maintained by the AWB Utrecht - Animal Welfare Body Utrecht - (IvD Utrecht, in Dutch) </p><p> In biomedical research (laboratory) animals are also used as tissue donors. This often only involves a single organ or piece of tissue. Often no destination is known for the remains and it is either destroyed immediately after collection or left unused in researchers' freezers for years. If fellow researchers know in good time which tissues and organs are or will become available, or vice versa, if researchers inform colleagues in good time for which organs or tissues they need, this creates the opportunity to make better use of laboratory animals. </p><p> A substantial part of the animals that are redundant are also no longer used. These are animals that are redundant after use in breeding, animals that have been bred but for which there is no destination, or animals that are alive and healthy after use in an experiment. These healthy surplus laboratory animals can possibly be used in (other) experiments, and no animals need to be purchased or bred for this. </p><p>As a result, fewer laboratory animals are needed overall.</p><p> The Animal and Tissue Exchange platform (ATEX) makes supply and demand visible and thus contributes to better use of animals, organs and tissues. </p><p>ATEX is intended for the exchange of:</p><ul> <li>Live surplus laboratory animals</li><li>Fresh organs and tissue</li><li>Preserved organs and tissue</li></ul> <p> To use this application you must first create an account. You can then enter specifications for your supply or demand within the secure environment of the application, such as the animal, strain, sex and age. In addition, you can indicate whether the animals have undergone a certain operation or treatment, which materials have been stored and how. Finally, you can check whether there are matches for your supply or demand. If you would like more information about the match (the described material or animals) you can contact the relevant researchers. </p><p> If you want to use a supply of live animals and want to (re) use these animals to collect tissues or in an experiment, take into account the “Policy surplus laboratory animals, reuse and relocation” ( <a href='https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren'> https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren </a> ). </p><p> If you want to use the animals for tissue harvesting and you do not have a project permit for this, you may be able to use the umbrella project “Use of organs and tissues to promote the quality of animal experiments and in vitro and ex vivo research” (AVD1080020209606) . </p><p> More information about this can be obtained from the AWB Utrecht ( <a href='https://www.ivd-utrecht.nl/en'>https://www.ivd-utrecht.nl/en</a>). </p>"
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
            $f->content = isset($item["content"]) ? $item["content"] : "";
            $f->show = true;
            $f->save();
        }
    }
}
