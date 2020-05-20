<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExchangeOfferStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $sampleValidation = config('validation.samples');
        $exchangeRequestValidation = [
            'age' => 'required|string',
            'procedures' => 'required|string',
            'protocol_number_known' => 'required|string',
            'protocol_number' => 'nullable|string',
            'date_available' => 'nullable|string',
            'amount' => 'required|string'
        ];
        return array_merge($sampleValidation, $exchangeRequestValidation);
    }
}
