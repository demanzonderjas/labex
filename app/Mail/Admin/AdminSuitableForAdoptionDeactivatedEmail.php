<?php

namespace App\Mail\Admin;

use App\ExchangeAttempt;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminSuitableForAdoptionDeactivatedEmail extends Mailable
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
		return $this->view('mail.admin.offer-with-adoption-deactivated')->subject("ATEX - An offer which is suitable for adoption is deactivated");
	}
}