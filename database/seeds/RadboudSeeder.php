<?php

namespace Database\Seeders;

use App\AdminRole;
use App\Signup;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RadboudSeeder extends Seeder
{
	public function run()
	{
		$admins = [
			[
				"name" => "Christien Frederiks",
				"email" => "Christien.Frederiks@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Larissa Heij",
				"email" => "Larissa.Heij@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Janny Verstegen",
				"email" => "Janny.Verstegen-Groning@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Pieter Verbost",
				"email" => "Pieter.Verbost@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Miriam Kool",
				"email" => "Miriam.Kool@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Jeannette Lorteije",
				"email" => "Jeannette.Lorteije@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Anke Schoenmakers",
				"email" => "Anke.Schoenmakers@radboudumc.nl",
				"organisation" => "radboudumc"
			],
		];

		$users = [
			[
				"name" => "Judith Homberg",
				"email" => "Judith.Homberg@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Monique Wolvekamp",
				"email" => "Monique.Wolvekamp@ru.nl",
				"organisation" => "radboud-universiteit"
			],
			[
				"name" => "Mattijs Kox",
				"email" => "Mattijs.Kox@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Dorien van de Pol",
				"email" => "Dorien.vandePol@radboudumc.nl",
				"organisation" => "radboudumc"
			],
		];

		$mailables = [
			[
				"name" => "IVD Radboud",
				"email" => "instantievoordierenwelzijn@radboudumc.nl",
				"organisation" => "radboudumc"
			],
			[
				"name" => "Helpdesk CDL",
				"email" => "helpdesk.cdl@radboudumc.nl",
				"organisation" => "radboudumc"
			]
		];

		foreach ($admins as $admin) {
			$u = User::firstOrNew(['email' => $admin['email']]);
			// $u->fill($admin);
			// $u->is_admin = true;
			// $u->token = Str::random(20);
			$u->save();

			// $s = Signup::firstOrNew(['email' => $admin['email']]);
			// $s->fill($admin);
			// $s->awaiting_approval = false;
			// $s->approved = true;
			// $s->save();

			// $newRole = new AdminRole([
			// 	"type" => "organisation",
			// 	"value" => $admin["organisation"]
			// ]);

			$newRole = new AdminRole([
				"type" => "organisation",
				"value" => "radboud-universiteit"
			]);

			$u->adminRoles()->save($newRole);
		}

		// foreach ($users as $user) {
		// 	$u = User::firstOrNew(['email' => $user['email']]);
		// 	$u->fill($user);
		// 	$u->token = Str::random(20);
		// 	$u->save();

		// 	$s = Signup::firstOrNew(['email' => $user['email']]);
		// 	$s->fill($user);
		// 	$s->awaiting_approval = false;
		// 	$s->approved = true;
		// 	$s->save();
		// }

		// foreach ($mailables as $mailable) {
		// 	$u = User::firstOrNew(['email' => $mailable['email']]);
		// 	$u->fill($mailable);
		// 	$u->is_admin = true;
		// 	$u->token = Str::random(20);
		// 	$u->save();

		// 	$newRole = new AdminRole([
		// 		"type" => "organisation",
		// 		"value" => $mailable["organisation"]
		// 	]);

		// 	$newRole2 = new AdminRole([
		// 		"type" => "organisation",
		// 		"value" => "radboud-universiteit"
		// 	]);

		// 	$mailRole = new AdminRole([
		// 		"type" => "mailable",
		// 		"value" => "yes"
		// 	]);

		// 	$u->adminRoles()->save($newRole);
		// 	$u->adminRoles()->save($newRole2);
		// 	$u->adminRoles()->save($mailRole);
		// }
	}
}
