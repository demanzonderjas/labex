<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExchangeAttemptStoreRequest extends FormRequest
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
        $exchangeType = $this->request('attempt_type');
        $defaultValidation = config('validation.exchange_attempt_fields');
        $typeValidation = config('validation.exchange_attempt_type' . $exchangeType . 'fields');
        return array_merge($defaultValidation, $typeValidation);
    }
}
