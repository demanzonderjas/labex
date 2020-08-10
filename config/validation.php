<?php

return [
    "samples" => [
        "type" => "nullable|string",
        "animal_species" => "nullable|string",
        "strain" => "nullable|string",
        "sex" => "nullable|string",
        "origin" => "nullable|string",
        "spf" => "nullable|string",
        "storage" => "nullable|string",
        "naive" => "nullable|string",
        "kill_method" => "nullable|string",
        "sample_number" => "nullable|string"
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
        "bovine",
        "chicken",
        "zebra_finch",
        "zebrafish"
    ],
    "sex" => [
        "male",
        "female"
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
        "lynf_knots",
        "bone",
        "intestine",
        "skin",
    ],
    "yes_no" => ["yes", "no"]
];
