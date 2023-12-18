<?php

namespace App\Mail;

use App\ExchangeAttempt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SuitableForAdoptionDeactivatedEmail extends Mailable
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
		return $this->view('mail.offer-with-adoption-deactivated')->subject("ATEX - Your offer which is suitable for adoption offer has reached the available end date");
	}
}
