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
                "content" => "<p>The material and contact information shown within the LABEXUS platform is all secured behind the 2-factor authentication of the university.</p><p>All of the sensitive data, like contact information and the information in your offers and requests will be encrypted when saved in the database as well, so even if the data were compromised, it would be useless.</p>"
            ],
            [
                "category" => "Security",
                "title" => "How is the safety of the chemical substances?",
                "content" => "..."
            ],
            [
                "category" => "Matches",
                "title" => "Do I have to delete my offer myself if it is no longer available?",
                "content" => "<p>Whenever your offer/request finds a match within the LABEXUS platform, it will automatically be hidden from further matching. If you find a match outside of LABEXUS, then you can delete your offer/request from your dashboard manually.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "How do I know that the offer stated in the application is still available?",
                "content" => "<p>If offered material has found a match (and thus is not available any more), it will be hidden from the overview, so this way the offers stay relevant and up to date.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "Why do I see matches below 100%?",
                "content" => "<p>To keep the platform as versatile and informative as possible, we chose to show matches below 100%. This gives you the option to select a match that may not reflect your wishes fully, but is still a workable alternative.</p><p>When selecting a match, you can see exactly which fields of the offer/request did and did not match.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "How does the matching of offers and requests work?",
                "content" => "<p>The matching works with two types of filters, 'hard' filters and 'soft' filters.</p><p>Hard filters make sure that the only matches that you see match your given filter criteria. Soft filters influence only the match percentage, but do not filter the material in the results.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "How do I stay up to date with the status of the match?",
                "content" => "<p>The status of the match will automatically be communicated once a match is found, approved and declined, via email.</p><p>The mail will also contain the contact details of the person you are matched up with, so you can arrange for the material to be exchanged.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "I created the wrong match by accident, what should I do now?",
                "content" => "If you create and submit a match that is not useful to you, you can cancel it via the '<a href='/app/my-matches'>'My matches'</a> page. Your offer or request will then be re-entered into the system automatically, so that you can look for a new match."
            ],
            [
                "category" => "Privacy",
                "title" => "What data of my profile do you store?",
                "content" => "As little as possible! We currently only store your name, email and laboratory/clinic. This information is only used to make sure you can reach out to the person you are matched up with."
            ],
            [
                "category" => "Privacy",
                "title" => "What cookies are stored/used?",
                "content" => "To be as privacy-friendly as possible, we only store the cookies required to keep you logged in while you navigate between pages. There are no analytical cookies, no marketing cookies and no other third-party cookies."
            ],
            [
                "category" => "Privacy",
                "title" => "How do I get the contact info of my match?",
                "content" => "The info is sent by mail once the match has been made."
            ],
            [
                "category" => "General",
                "title" => "Who can I contact for feedback/questions about LABEXUS?",
                "content" => "<p>For general questions/feedback on the information provided here, please contact <a href='mailto:info@labex.uu.nl'>info@labex.uu.nl</a></p><p>For technical issues/feedback, please contact <a href='mailto:tech@labex.uu.nl'>info@labexus.nl</a></p>"
            ],
            [
                "category" => "General",
                "title" => "What does LABEXUS do?",
                "content" => "<p>This platform is provided and maintained by ........ Utrecht</p> <p> Some of the equipment is not used optimally in both laboratories and clinics. For example, because the devices are used infrequently, or because equipment remains present after completion of a project or after departure of researchers but is no longer used. This often concerns equipment that is still in good working order. This can be very useful for fellow researchers, but they are usually unaware of its presence. A digital marketplace can make supply and demand visible and thus enable transfer or joint use. This enables more sustainable use of equipment. Moreover, this reduces the costs for the researchers. </p> <p> In many laboratories and clinics also contain chemical preparations, medicines, or disposables are available that are either no longer used or are present in quantities that far exceed requirements. If these surpluses are made available to fellow researchers/clinicians, the material will be used more optimally and less of it will have to be purchased and disposed of unused. </p> <p> As a result, fewer equipment, chemical substances and disposables are needed overall. </p> <p> The Laboratory Exchange platform (LABEXUS) makes offers and requests visible and thus contributes to better use of these materials. </p> <p>LABEXUS is intended for the exchange of:</p> <ul> <li>Laboratory or Clinical Equipment</li> <li>Chemical substances</li> <li>Disposables</li> </ul> <p> To use this application you must first create an account. You can then enter specifications for your offer or request within the secure environment of the application, such as kind of device or substance, type of availability, the moment it becomes available or is needed, etc.. Finally, you can check whether there are matches for your offer or request. If you would like more information about the match (the described equipment or material) you can contact the owner of the offer or request. </p>"
            ],
            [
                "category" => "Other",
                "title" => "What about the ownership of the equipment and materials?",
                "content" => "<p>Ownership of the equipment or materials has to be agreed on with the lab offering and the lab collecting the material.</p><p>As a general rule: the lab receiving the equipment or materials will become the owner of these and be responsible for the proper transport, use, handling, treatment, and disposal.</p>"
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
