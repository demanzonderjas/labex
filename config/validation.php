<?php

return [
    "samples" => [
        "animal_species" => "required|string",
        "strain" => "required|string",
        "sex" => "required|string",
        "origin" => "required|string",
        "spf" => "required|string",
        "microbiome" => "nullable|string",
        "storage" => "nullable|string",
        "naive" => "required|string",
        "inconvenience_level" => "nullable|string",
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
        "female",
        "irrelevant"
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
