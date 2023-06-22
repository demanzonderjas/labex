<?php

return [
    "attempt_types" => [
        "offer",
        "request"
    ],
    "exchange_status" => [
        "active",
        "inactive",
        "adoption"
    ],
    "exchange_attempt_fields" => [
        "type" => "nullable|string",
        "animal_species" => "nullable|string",
        'organs' => 'nullable|string',
        "strain" => "nullable|string",
        "sex" => "nullable|string",
        "origin" => "nullable|string",
        "spf" => "nullable|string",
        "storage" => "nullable|string",
        "naive" => "nullable|string",
        'protocol_number' => 'nullable|string',
        "kill_method" => "nullable|string",
        "sample_number" => "nullable|string",
        'amount' => 'required|string',
        'extra_info' => 'nullable|string',
        'animal_numbers' => 'nullable|string',
    ],
    "exchange_attempt_offer_fields" => [
        'age' => 'required|string',
        'date_available_start' => 'nullable|string',
        'date_available' => 'nullable|string',
        'suitable_for_adoption' => 'nullable|string',
        'location' => 'nullable|string',
    ],
    "exchange_attempt_request_fields" => [
        'age_type' => 'required|string',
        'age_min' => 'required|alpha_num',
        'age_max' => 'required|alpha_num',
        'date_requested' => 'nullable|string',
    ],
    "type" => [
        "animal", "vital_tissue", "conserved_tissue"
    ],
    "animal_species" => [
        "mouse",
        "rat",
        "guinea_pig",
        "hamster",
        "rabbit",
        "dog",
        "cat",
        "ferret",
        "pig",
        "sheep",
        "goat",
        "horse",
        "cattle",
        "chicken",
        "zebra_finch",
        "zebrafish"
    ],
    "sex" => [
        "male",
        "female",
        "both"
    ],
    "origin" => [
        "experiment", "breeding"
    ],
    "storage" => [
        "fresh", "frozen", "liquid_nitrogen", "preserved"
    ],
    "age_type" => ["weeks", "months", "years"],
    "spf" => [
        "spf", "conventional", "unknown"
    ],
    "kill_method" => [
        "co2_o2",
        "cervical_dislocation",
        "decapitation",
        "terminal_anesthesia",
        "overdose_of_euthasate",
        "electrocution"
    ],
    "organs" => [
        "liver",
        "kidneys",
        "lung",
        "heart",
        "brains",
        "blood",
        "muscle_tissue",
        "lymph_nodes",
        "bone",
        "intestine",
        "skin",
    ],
    "yes_no" => ["yes", "no"]
];
