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
                "content" => "<p>The shown material and contact information within the ATEX platform is all secured behind the 2-factor authentication of the universities, and, as a secondary check, behind a manually controlled list of allowed participants who have the article 9 clearance.</p><p>All of the sensitive data, like contact information and the filled-in material will be encrypted when saved into the database as well, so even when the data would get compromised, it would be useless.</p>"
            ],
            [
                "category" => "Privacy",
                "title" => "Which target groups are allowed to use this online platform?",
                "content" => "<p>Researchers, teachers, biotechnicians, research analysts who conduct biomedical research within
                Utrecht University, UMC Utrecht, or Hogeschool Utrecht, who conduct in vivo experiments, provide
                education with laboratory animals, or conduct ex vivo / in vitro research using animal tissue.
                </p><p>One must have a qualification in accordance with art. 9, or art. 13f2a of the Animal Experiments Act
                (Wod). Exceptions are possible after consultation with the IvD Utrecht.</p>"
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
                "content" => "<p><strong>Wod:</strong> If surplus laboratory animals are offered and an applicant wishes to take them over for reuse,
                the IvD Utrecht will check whether this is possible, taking into account the legal criteria that are set
                for reuse and whether an approved work protocol is or will be available on which the animals are
                reused. In the event that surplus tissue becomes available from animals that are killed in the context
                of a licensed experiment, and this tissue must be harvested before death occurs, the IvD Utrecht will
                ensure that the implementation falls within the legal rules and project license.</p>
                <p><strong>AVG:</strong> All requirements of the General Data Protection Regulation (AVG) are respected. This is also
                laid down in the processor agreement that UU concludes with other institutions whose employees
                use ATEX.</p>"
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
                "content" => "<p><strong>General rule:</strong> when you exchange animal materials, in particular when it is fresh tissue, you have to
                treat it as biohazardous material. Although material might be available from SPF animals, this does
                not imply that they are completely pathogen-free. In addition to possible zoonoses, when you also
                work with animals, infection from tissue to your animals, when not the right precautions are taken, is
                a real risk.</p><p>Risk is dependent on the source of the tissue, and the lab offering the tissue should supply sufficient
                information about the (health) risks when handling and using the tissue.</p>
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
                "title" => "How does it work with the ownership of the animals/tissues?",
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
