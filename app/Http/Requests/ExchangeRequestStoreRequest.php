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
        $sampleValidation = config('validation.samples');
        $exchangeRequestValidation = [
            'age' => 'nullable|string',
            'organs' => 'required|string',
            'amount' => 'nullable|string',
            'date_requested' => 'nullable|string',
        ];
        return array_merge($sampleValidation, $exchangeRequestValidation);
    }
}
