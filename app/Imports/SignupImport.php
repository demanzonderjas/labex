<?php

namespace App\Imports;

use App\Signup;
use Maatwebsite\Excel\Concerns\ToModel;

class SignupImport implements ToModel
{
    /**
     * @param array $row
     *
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        $signup = Signup::firstOrNew(['email' => $row[1]]);
        $signup->fill([
            'name' => $row[0],
            'organisation' => 'radboudumc',
            'awaiting_approval' => false,
            'approved' => true
        ]);
        return $signup;
    }
}
