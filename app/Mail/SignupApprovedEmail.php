<?php

namespace App\Mail;

use App\Signup;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SignupApprovedEmail extends Mailable
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
		return $this->view('mail.signup-approved')->subject("ATEX - Your sign up has been approved!");
	}
}
