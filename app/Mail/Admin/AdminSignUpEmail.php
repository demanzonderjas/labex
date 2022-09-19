<?php

namespace App\Mail\Admin;

use App\Signup;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminSignUpEmail extends Mailable
{
	use Queueable, SerializesModels;

	public $signup;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(Signup $signup)
	{
		$this->signup = $signup;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('mail.admin.new-signup')->subject("ATEX - A new user has signed up for access");
	}
}
