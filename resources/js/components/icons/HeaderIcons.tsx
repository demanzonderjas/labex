import React from "react";
import { COLOR_PINK, COLOR_PURPLE } from "../../data/configs/colors";

export function OfferIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				d="M13.904 9c-3.514-3.984-.1-7.598-.1-7.598l-1.393-1.389 5.589-.013v5.607l-1.372-1.391c0 .001-3.581.706-2.724 4.784zm5.752 6.024l-.35.199v1.717l.35-.199v-1.717zm.844-.481l-.342.195v1.717l.342-.195v-1.717zm-3.407 1.941l-.349.199v1.713l.349-.195v-1.717zm1.979-1.127l-.343.195v1.717l.343-.195v-1.717zm.949-10.673v2.295l.855.489-6.859 3.698-8.86-5.138 6.374-3.654-1.5-1.406-6.864 3.97-3.167 5.533 2 1.106v5.445l12.25 6.978 9.75-5.551v-11.508l-3.979-2.257zm-16.083 3.004l7.897 4.54-1.193 2.091-7.871-4.605 1.167-2.026zm9.062 13.298l-9-5.126v-3.112l5.632 3.297 1.746 1.022 1.002-1.757.62-1.088v6.764zm9-3.7l-7 3.985v-8.361l7-3.773v8.149zm-4.323-1.135l-.343.195v1.717l.343-.195v-1.717zm.821-.467l-.344.196v1.717l.344-.196v-1.717z"
				fill={COLOR_PURPLE}
			/>
		</svg>
	);
}

export function RequestIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path
				d="M14.039 8.968l-3.961-3.968h1.968s.991-3.178-2.985-5c6.191.222 6.972 5 6.972 5h1.967l-3.961 3.968zm6.461 5.575l-.342.195v1.717l.342-.195v-1.717zm-.844.481l-.35.199v1.717l.35-.199v-1.717zm.906-10.024l-1.306 1.55 1.62.919-6.859 3.698-8.86-5.138 4.436-2.685c-.234-.5-.626-.989-1.313-1.338l-5.124 2.978-3.156 5.487 2 1.106v5.445l12.25 6.978 9.75-5.551v-11.508l-3.438-1.941zm-16.624 2.688l7.897 4.54-1.192 2.091-7.872-4.605 1.167-2.026zm9.062 13.298l-9-5.126v-3.112l7.377 4.319 1.623-2.845v6.764zm9-3.7l-7 3.985v-8.361l7-3.773v8.149zm-4.907-.802l-.349.199v1.713l.349-.195v-1.717zm.584-.333l-.343.195v1.717l.343-.195v-1.717zm1.395-.794l-.343.195v1.717l.343-.195v-1.717zm-.574.327l-.344.196v1.717l.344-.196v-1.717z"
				fill={COLOR_PINK}
			/>
		</svg>
	);
}

export function MatchesIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M10.024 4h6.015l7.961 8-7.961 8h-6.015l7.961-8-7.961-8zm-10.024 16h6.015l7.961-8-7.961-8h-6.015l7.961 8-7.961 8z" />
		</svg>
	);
}

export function DashboardIcon() {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 3c-2.21 0-4 1.791-4 4s1.79 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zm-.004 3.999c-.564.564-1.479.564-2.044 0s-.565-1.48 0-2.044c.564-.564 1.479-.564 2.044 0s.565 1.479 0 2.044z" />
		</svg>
	);
}

export const HeaderIcon = ({ type }) => {
	const icons = {
		offers: {
			Component: OfferIcon
		},
		submit_offer: {
			Component: OfferIcon
		},
		edit_offer: {
			Component: OfferIcon
		},
		requests: {
			Component: RequestIcon
		},
		submit_request: {
			Component: RequestIcon
		},
		edit_request: {
			Component: RequestIcon
		},
		my_matches: {
			Component: MatchesIcon
		},
		exchange_platform: {
			Component: DashboardIcon
		}
	};

	if (!type || !icons[type]) {
		return null;
	}

	const IconComponent = icons[type].Component;

	return <IconComponent />;
};
