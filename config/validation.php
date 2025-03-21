<?php

return [
    "allowed_domains" => [
        "uu.nl",
        "puzzel.org",
        "umcutrecht.nl",
        "genmab.com",
        "hu.nl",
        "prinsesmaximacentrum.nl"
    ],
    "roles" => [
        "content",
        "moderator",
    ],
    "attempt_types" => [
        "offer",
        "request"
    ],
    "exchange_status" => [
        "active",
        "inactive",
    ],
    "exchange_attempt_fields" => [
        "type" => "nullable|string",
        "title" => "nullable|string",
        "image" => "nullable|string",
        "description" => "nullable|string",
        "location_building" => "nullable|string",
        "location_room" => "nullable|string",
        "device_type" => "nullable|string",
        "availability_type" => "nullable|string",
        "substance_category" => "nullable|string",
        "product_producer_number" => "nullable|string",
        "packaging_method" => "nullable|string",
        "storage" => "nullable|string",
        'reason_for_availability' => 'nullable|string',
        "disposable_category" => "nullable|string",
        'number' => 'nullable|string',
        'date_available_start' => 'nullable|string',
        'date_available' => 'nullable|string',
        'date_requested' => 'nullable|string',
        'contact_details' => 'nullable|string',
        'extra_info' => 'nullable|string',
        'attempt_type' => 'required',
        'amount' => 'nullable|string',
        'volume_weight' => 'nullable|string',
        'operational_age' => 'nullable|string',
        'expiry_date' => 'nullable|string',

    ],
    "type" => [
        "equipment",
        "chemicals",
        "disposables",
        "furniture"
    ],
    "device_type" => [
        "incubator",
        "centrifuge",
        "water_bath",
        "freezer",
        "refrigerator",
        "microscope",
        "elisa_reader",
    ],
    "availability_type" => [
        "on_loan",
        "for_rent",
        "for_sale",
        "shared_use",
        "available_free_of_charge"
    ],
    "packaging_method" => [
        "non_packaged",
        "sterile",
        "net_sterile"
    ],
    "storage" => [
        "chilled",
        "in_freezer",
        "room_temperature",
        "liquid_nitrogen"
    ],
    "reason_for_availability" => [
        "redundant",
        "overdate"
    ],
    "yes_no" => ["yes", "no"]
];
