import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/base/Button";
import { LocalImage } from "../components/base/Image";
import { Footer } from "../components/layout/Footer";
import { HomePageHeader } from "../components/layout/Header";
import { PageIntro } from "../components/layout/PageIntro";
import { useTranslationStore } from "../hooks/useTranslationStore";

export const AboutUsPage: React.FC = () => {
	const { t } = useTranslationStore();
	const navigate = useNavigate();

	return (
		<div className="AboutUs">
			<HomePageHeader />
			<PageIntro header="atex"></PageIntro>
			<div className="layout-wrapper content">
				<Button label="back" handleClick={() => navigate("/")} />
				<div style={{ margin: "40px 0" }}>
					<LocalImage path="logo/atex.png" />
				</div>
				<p>
					This platform is provided and maintained by the AWB Utrecht - Animal WelfareBody
					Utrecht - (IvD Utrecht, in Dutch)
				</p>
				<p>
					In biomedical research laboratory animals (and sometimes other animals) can be
					used as tissue donors. This often only involves a single organ or piece of
					tissue. Often there is no destination for the remains and they are either
					destroyed immediately after collection or left unused in researchers' freezers
					for years. If fellow researchers know in good time which tissues and organs are
					or will become available, or vice versa, if researchers inform colleagues in
					good time of what organs or tissues they need, this creates the opportunity to
					make better use of laboratory animals.
				</p>
				<p>
					A substantial number of the animals that are alive but redundant are also no
					longer used. These are animals that have been used for breeding, animals that
					have been bred but for which there is no destination, or animals that are alive
					and healthy after use in an experiment. These healthy surplus laboratory animals
					can possibly be used in new experiments, so no animals need to be purchased or
					bred for this.
				</p>
				<p>As a result, fewer laboratory animals are needed overall.</p>
				<p>
					The Animal and Tissue Exchange platform (ATEX) makes offers and requests visible
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
					specifications for your offer or request within the secure environment of the
					application, such as the animal species, strain, sex and age. In addition, you
					can indicate whether the animals have undergone a certain operation or
					treatment, which materials have been stored and how. Finally, you can check
					whether there are matches for your offer or request. If you would like more
					information about the match (the described material or animals) you can contact
					the relevant researchers.
				</p>
				<h2>
					<strong>Re-use of animals</strong>
				</h2>
				<p>
					If you want to use a supply of live animals and want to (re) use these animals
					to collect tissues or in an experiment, take into account the “Policy surplus
					laboratory animals, reuse and relocation” (
					<a href="https://ivd-utrecht.nl/en/infocentre/document/policy-on-surplus-laboratory-animals-reuse-and-re-homing">
						https://ivd-utrecht.nl/en/infocentre/document/policy-on-surplus-laboratory-animals-reuse-and-re-homing
					</a>
					).
				</p>
				<p>
					<strong>Harvesting tissue: when is it an animal experiment?</strong>
					<br />
					Harvesting tissue is an animal experiment when:
					<ul>
						<li>it determines the moment at which the animal is killed</li>
						<li>
							actions must be carried out for this purpose prior to killing the
							animal. In these cases a project permit is required.
						</li>
					</ul>
				</p>
				<p>
					If you do not have a project permit for this, you may be able to use the
					umbrella project “Use of organs and tissues to promote the quality of animal
					experiments and in vitro and ex vivo research” (AVD1080020209606) .
				</p>
				<p>
					More information about this can be obtained from the AWB Utrecht (
					<a href="https://www.ivd-utrecht.nl/en">https://www.ivd-utrecht.nl/en</a>).
				</p>
				<Button label="back_to_homepage" handleClick={() => navigate("/")} />
			</div>
			<Footer />
		</div>
	);
};
