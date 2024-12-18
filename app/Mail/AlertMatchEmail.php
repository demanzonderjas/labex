<?php

namespace App\Mail;

use App\ExchangeAttempt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AlertMatchEmail extends Mailable
{
	use Queueable, SerializesModels;

	public $attempt;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	public function __construct(ExchangeAttempt $attempt)
	{
		$this->attempt = $attempt;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('mail.alert-match')->subject("LABEXUS - A new possible match for your alert was found");
	}
}
