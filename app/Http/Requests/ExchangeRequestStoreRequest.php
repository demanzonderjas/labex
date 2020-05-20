<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExchangeRequestStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'animal_species' => 'required|string',
            'tribe' => 'required|string',
            'gender' => 'required|string',
            'is_age_relevant' => 'required|string',
            'age' => 'nullable|string',
            'weight_type' => 'nullable|string',
            'weight' => 'nullable|string',
            'origin' => 'required|string',
            'spf' => 'required|string',
            'microbiome' => 'nullable|string',
            'organs' => 'required|string',
            'storage' => 'required_unless:origin,animal|nullable|string',
            'date_requested' => 'nullable|string',
            'naive' => 'required|string',
            'inconvenience_level' => 'nullable|string',
            'kill_method' => 'nullable|string',
            'amount' => 'nullable|string',
            'sample_number' => 'nullable|string'
        ];
    }
}
