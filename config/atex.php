<?php

return [
	"organisations" => [
		"uu.nl" => "University of Utrecht",
		"universiteit-utrecht" => "University of Utrecht",
		"umcutrecht.nl" => "UMC Utrecht"
	],
	"constants" => [
		"exchange_attempt_status" => [
			"active" => "active",
			"inactive" => "inactive",
			"adoption" => "adoption",
		],
		"offer" => "offer",
		"request" => "request",
		"match_status" => [
			"approved" => "approved",
			"approved_once" => "approved_once",
			"awaiting_approval" => "awaiting_approval",
			"rejected" => "rejected"
		],
		"exchange_type" => [
			"animal" => "animal",
			"vital_tissue" => "vital_tissue",
			"conserved_tissue" => "conserved_tissue",
		],
		"days_before_inactive" => 14,
		"days_before_adoption_reminder" => 7,
		"days_per_period" => [
			"weeks" => 7,
			"years" => 365,
			"months" => 30
		]
	]
];
