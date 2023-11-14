<?php

namespace App\Imports;

use App\Signup;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class SignupImport implements ToModel, WithHeadingRow
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $signup = Signup::firstOrNew(['email' => $row['mail']]);
        $signup->fill([
            'name' => $row['name'],
            'organisation' => 'radboudumc',
            'awaiting_approval' => false,
            'approved' => true
        ]);
        return $signup;
    }
}
