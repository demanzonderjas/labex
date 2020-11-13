import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../components/base/Button";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const AboutUsPage: React.FC = () => {
	const { t } = useTranslationStore();
	const history = useHistory();

	return (
		<div className="AboutUs">
			<HomePageHeader />
			<PageIntro header="atex"></PageIntro>
			<div className="layout-wrapper content">
				<Button label="back" handleClick={() => history.push("/")} />
				<p>
					In biomedical research (laboratory) animals are also used as tissue donors. This
					often only involves a single organ or piece of tissue. Often no destination is
					known for the remains and it is either destroyed immediately after collection or
					left unused in researchers' freezers for years. If fellow researchers know in
					good time which tissues and organs are or will become available, or vice versa,
					if researchers inform colleagues in good time for which organs or tissues they
					need, this creates the opportunity to make better use of laboratory animals.
				</p>
				<p>
					A substantial part of the animals that are redundant are also no longer used.
					These are animals that are redundant after use in breeding, animals that have
					been bred but for which there is no destination, or animals that are alive and
					healthy after use in an experiment. These healthy surplus laboratory animals can
					possibly be used in (other) experiments, and no animals need to be purchased or
					bred for this.
				</p>
				<p>As a result, fewer laboratory animals are needed overall.</p>
				<p>
					The Animal and Tissue Exchange platform (ATEX) makes supply and demand visible
					and thus contributes to better use of animals, organs and tissues.
				</p>
				<p>ATEX is intended for the exchange of:</p>
				<ul>
					<li>Live surplus laboratory animals</li>
					<li>Fresh organs and tissue</li>
					<li>Preserved organs and tissue</li>
				</ul>
				<p>
					To use this application you must first create an account. You can then enter
					specifications for your supply or demand within the secure environment of the
					application, such as the animal, strain, sex and age. In addition, you can
					indicate whether the animals have undergone a certain operation or treatment,
					which materials have been stored and how. Finally, you can check whether there
					are matches for your supply or demand. If you would like more information about
					the match (the described material or animals) you can contact the relevant
					researchers.
				</p>
				<p>
					If you want to use a supply of live animals and want to (re) use these animals
					to collect tissues or in an experiment, take into account the “Policy surplus
					laboratory animals, reuse and relocation” (
					<a href="https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren">
						https://www.ivd-utrecht.nl/nl/infocentrum/document/beleid-surplus-proefdieren-hergegevens-en-herplaatsing-proefdieren
					</a>
					).
				</p>
				<p>
					If you want to use the animals for tissue harvesting and you do not have a
					project permit for this, you may be able to use the umbrella project “Use of
					organs and tissues to promote the quality of animal experiments and in vitro and
					ex vivo research” (AVD1080020209606) .
				</p>
				<p>
					More information about this can be obtained from the IvD Utrecht (
					<a href="https://www.ivd-utrecht.nl/en">https://www.ivd-utrecht.nl/en</a>).
				</p>
				<Button label="back_to_homepage" handleClick={() => history.push("/")} />
			</div>
			<Footer />
		</div>
	);
};
