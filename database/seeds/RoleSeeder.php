<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = config('validation.roles');

        foreach ($roles as $role) {
            $r = new Role();
            $r->name = $role;
            $r->save();
        }
    }
}
