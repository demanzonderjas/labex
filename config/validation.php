<?php

return [
    "samples" => [
        'animal_species' => 'required|string',
        'strain' => 'required|string',
        'sex' => 'required|string',
        'weight_type' => 'nullable|string',
        'weight' => 'nullable|string',
        'origin' => 'required|string',
        'spf' => 'required|string',
        'microbiome' => 'nullable|string',
        'storage' => 'nullable|string',
        'naive' => 'required|string',
        'inconvenience_level' => 'nullable|string',
        'kill_method' => 'nullable|string',
        'sample_number' => 'nullable|string'
    ]
];
