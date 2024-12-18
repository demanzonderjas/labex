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
			<PageIntro header="platform_name"></PageIntro>
			<div className="layout-wrapper content">
				<Button label="back" handleClick={() => navigate("/")} />
				<div style={{ height: "150px", margin: "40px 0" }}>
					<LocalImage path="logo/labex.webp" />
				</div>
				<p>This platform is provided and maintained by ........ Utrecht</p>
				<p>
					Some of the equipment is not used optimally in both laboratories and clinics.
					For example, because the devices are used infrequently, or because equipment
					remains present after completion of a project or after departure of researchers
					but is no longer used. This often concerns equipment that is still in good
					working order. This can be very useful for fellow researchers, but they are
					usually unaware of its presence. A digital marketplace can make supply and
					demand visible and thus enable transfer or joint use. This enables more
					sustainable use of equipment. Moreover, this reduces the costs for the
					researchers.
				</p>
				<p>
					In many laboratories and clinics also contain chemical preparations, medicines,
					or disposables are available that are either no longer used or are present in
					quantities that far exceed requirements. If these surpluses are made available
					to fellow researchers/clinicians, the material will be used more optimally and
					less of it will have to be purchased and disposed of unused.
				</p>
				<p>
					As a result, fewer equipment, chemical substances and disposables are needed
					overall.
				</p>
				<p>
					The Laboratory Exchange platform (LABEXUS) makes offers and requests visible and
					thus contributes to better use of these materials.
				</p>
				<p>LABEXUS is intended for the exchange of:</p>
				<ul>
					<li>Laboratory or Clinical Equipment</li>
					<li>Chemical substances</li>
					<li>Disposables</li>
				</ul>
				<p>
					To use this application you must first create an account. You can then enter
					specifications for your offer or request within the secure environment of the
					application, such as kind of device or substance, type of availability, the
					moment it becomes available or is needed, etc.. Finally, you can check whether
					there are matches for your offer or request. If you would like more information
					about the match (the described equipment or material) you can contact the owner
					of the offer or request.
				</p>
			</div>
			<Footer />
		</div>
	);
};
