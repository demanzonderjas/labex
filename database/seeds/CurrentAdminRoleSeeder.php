<?php

namespace Database\Seeders;

use App\AdminRole;
use App\User;
use Illuminate\Database\Seeder;

class CurrentAdminRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admins = User::where('is_admin', true)->get();

        foreach ($admins as $admin) {
            $newRole = new AdminRole([
                "type" => "organisation",
                "value" => "universiteit-utrecht"
            ]);
            $newRole2 = new AdminRole([
                "type" => "organisation",
                "value" => "umcutrecht.nl"
            ]);

            $admin->adminRoles()->save($newRole);
            $admin->adminRoles()->save($newRole2);
        }
    }
}
