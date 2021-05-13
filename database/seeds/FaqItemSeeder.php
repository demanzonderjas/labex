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
                "content" => "<p>The material and contact information shown within the ATEX platform is all secured behind the 2-factor authentication of the universities, and, as a secondary check, behind a manually controlled list of allowed participants who have an article 9 clearance.</p><p>All of the sensitive data, like contact information and the information in your offers and requests will be encrypted when saved in the database as well, so even if the data were compromised, it would be useless.</p>"
            ],
            [
                "category" => "Privacy",
                "title" => "Who is allowed to use this online platform?",
                "content" => "<p>Researchers, teachers, biotechnicians, research analysts who conduct biomedical research within
                Utrecht University, UMC Utrecht, or Hogeschool Utrecht, who conduct in vivo experiments, provide
                education with laboratory animals, or conduct ex vivo / in vitro research using animal tissue.
                </p><p>One must have a qualification in accordance with art. 9, or art. 13f2a of the Animal Experiments Act
                (Wod). Exceptions are possible after consultation with the AWB Utrecht.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "Do I have to delete my offer myself if it is no longer available?",
                "content" => "<p>Whenever your offer/request finds a match within the ATEX platform, it will automatically be hidden from further matching. If you find a match outside of ATEX, then you can delete your offer/request from your dashboard manually.</p><p>Offered vital issues and animals are also automatically archived after 14 days, so keeping it up to date is less cumbersome.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "How do I know that the offer stated in the application is still available?",
                "content" => "<p>Offers for vital tissues and animals are automatically archived after 14 days, making sure you only see fresh (or conserved) offers. If offered material has found a match (and thus is not available any more), it will be hidden from the overview, so this way the offers stay relevant and up to date.</p>"
            ],
            [
                "category" => "Privacy",
                "title" => "Are the legal requirements of the Experiments on Animals Act (Wod) and the General Data Protection Regulation (AVG) taken into account, and if so how?",
                "content" => "<p><strong>Wod:</strong> If surplus laboratory animals are offered and an applicant wishes to take them over for reuse,
                the AWB Utrecht will check whether this is possible, taking into account the legal criteria that are set
                for reuse and whether an approved work protocol is or will be available on which the animals are
                reused. In the event that surplus tissue becomes available from animals that are killed in the context
                of a licensed experiment, and this tissue must be harvested before death occurs, the AWB Utrecht will
                ensure that the implementation falls within the legal rules and project license.</p>
                <p><strong>AVG:</strong> All requirements of the General Data Protection Regulation (AVG) are respected. This is also
                laid down in the processor agreement that UU concludes with other institutions whose employees
                use ATEX.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "Why do I see matches below 100%?",
                "content" => "<p>To keep the platform as versatile and informative as possible, we chose to show matches below 100%. This gives you as the researcher the option to select a match that may not reflect your wishes fully, but is still a workable alternative.</p><p>When selecting a match, you can see exactly which fields of the offer/request did and did not match.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "What happens when a match is partial (in amount/organs)",
                "content" => "<p>Partial matches are re-entered into the system for the remaining amounts/organs.</p><p>As a calculation example:</p><p>=====</p><p>Offer: 70 brains, muscle tissue<br />Request: 20 brains, kidneys</p><p>>>></p><p>Match: 20 brains<br />New Offers: 50 brains, 70 muscle tissue<br />New Request: 20 kidneys</p>",
            ],
            [
                "category" => "Matches",
                "title" => "How does the matching of offers and requests work?",
                "content" => "<p>The matching works with two types of filters, 'hard' filters and 'soft' filters.</p><p>Hard filters make sure that the only matches that you see match your given filter criteria. Soft filters influence only the match percentage, but do not filter the animals and tissues in the results.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "How do I stay up to date with the status of the match?",
                "content" => "<p>The status of the match will automatically be communicated once a match is found, approved and declined, via email.</p><p>The mail will also contain the contact details of the person you are matched up with, so you can arrange for the animals and/or tissues to be exchanged.</p>"
            ],
            [
                "category" => "Matches",
                "title" => "I created the wrong match by accident, what should I do now?",
                "content" => "If you create and submit a match that is not useful to you, you can cancel it via the '<a href='/app/my-matches'>'My matches'</a> page. Your offer or request will then be re-entered into the system automatically, so that you can look for a new match."
            ],
            [
                "category" => "Privacy",
                "title" => "What data of my profile do you store?",
                "content" => "As little as possible! We currently only store your name, email and university. This information is only used to make sure you can reach out to the person you are matched up with."
            ],
            [
                "category" => "Privacy",
                "title" => "What cookies are stored/used?",
                "content" => "To be as privacy-friendly as possible, we only store the cookies required to keep you logged in while you navigate between pages. There are no analytical cookies, no marketing cookies and no other third-party cookies."
            ],
            [
                "category" => "Privacy",
                "title" => "How do I get the contact info of my match?",
                "content" => "The info is sent by mail once the match has been made and approved."
            ],
            [
                "category" => "General",
                "title" => "Who can I contact for feedback/questions about ATEX?",
                "content" => "<p>For general questions/feedback on the information provided here, please contact <a href='mailto:info@atex.uu.nl'>info@atex.uu.nl</a></p><p>For technical issues/feedback, please contact <a href='mailto:tech@atex.uu.nl'>tech@atex.uu.nl</a></p>"
            ],
            [
                "category" => "General",
                "title" => "What does ATEX do?",
                "content" => "<p>This platform is provided and maintained by the AWB Utrecht - Animal WelfareBody Utrecht - (IvD Utrecht, in Dutch)</p><p>In biomedical research laboratory animals (and sometimes other animals) can be used as tissue donors. This often only involves a single organ or piece of tissue. Often there is no destination for the remains and they are either destroyed immediately after collection or left unused in researchers' freezers for years. If fellow researchers know in good time which tissues and organs are or will become available, or vice versa, if researchers inform colleagues in good time of what organs or tissues they need, this creates the opportunity to make better use of laboratory animals.</p><p>A substantial number of the animals that are alive but redundant are also no longer used. These are animals that have been used for breeding, animals that have been bred but for which there is no destination, or animals that are alive and healthy after use in an experiment. These healthy surplus laboratory animals can possibly be used in new experiments, so no animals need to be purchased or bred for this.</p><p>As a result, fewer laboratory animals are needed overall.</p><p>The Animal and Tissue Exchange platform (ATEX) makes offers and requests visible and thus contributes to better use of animals, organs and tissues.</p><p>ATEX is intended for the exchange of:</p><ul><li>Live surplus laboratory animals</li><li>Fresh organs and tissue</li><li>Preserved organs and tissue</li></ul><p>To use this application you must first create an account. You can then enter specifications for your offer or request within the secure environment of the application, such as the animal species, strain, sex and age. In addition, you can indicate whether the animals have undergone a certain operation or treatment, which materials have been stored and how. Finally, you can check whether there are matches for your offer or request. If you would like more information about the match (the described material or animals) you can contact the relevant researchers.</p><p>If you want to use a supply of live animals and want to (re) use these animals to collect tissues or in an experiment, take into account the “Policy surplus laboratory animals, reuse and relocation” (<a href='https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren'>https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren</a>).</p><p>If you want to use the animals for tissue harvesting and you do not have a project permit for this, you may be able to use the umbrella project “Use of organs and tissues to promote the quality of animal experiments and in vitro and ex vivo research” (AVD1080020209606) .</p><p>More information about this can be obtained from the AWB Utrecht (<a href='https://www.ivd-utrecht.nl/en'>https://www.ivd-utrecht.nl/en</a>).</p>"
            ],
            [
                "category" => "Other",
                "title" => "How is the safety of the biomaterial?",
                "content" => "<p><strong>General rule:</strong> when you exchange animal materials, in particular when it is fresh tissue, you have to
                treat it as biohazardous material. Although material might be available from SPF animals, this does
                not imply that they are completely pathogen-free. In addition to possible zoonoses, when you also
                work with animals, there is a real risk of infection from tissue to your animals, unless the right precautions are taken.</p><p>Risk is dependent on the source of the tissue, and the lab offering the tissue should supply sufficient
                information about the health and other risks when handling and using the tissue.</p>
                <p>More information:</p>
                <ul>
                <li><a href='https://intranet.uu.nl/dierlijke-bijproducten'>https://intranet.uu.nl/dierlijke-bijproducten</a>
                <li><a href='https://www.uu.nl/sites/default/files/dgk-gdl-transport-van-dierlijke-bijproducten-van-en-naar-het-
                gdl.pdf'>https://www.uu.nl/sites/default/files/dgk-gdl-transport-van-dierlijke-bijproducten-van-en-naar-het-
                gdl.pdf</a>
                <li><a href='https://www.nvwa.nl/onderwerpen/dierlijke-bijproducten/regelgeving-over-dierlijke-bijproducten'>https://www.nvwa.nl/onderwerpen/dierlijke-bijproducten/regelgeving-over-dierlijke-bijproducten</a></li>
                </ul>"
            ],
            [
                "category" => "Other",
                "title" => "What about the ownership of the animals or tissues?",
                "content" => "<p>Ownership of the material or animals has to be agreed on with the lab offering and the lab collecting
                the animals or tissue.</p><p>As a general rule: the lab receiving the animals or tissue will become the owner of these and be
                responsible for the proper transport, use, handling, treatment, and disposal of animals or tissues.</p>"
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
