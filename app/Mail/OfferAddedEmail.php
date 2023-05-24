<?php

namespace App\Mail;

use App\ExchangeAttempt;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OfferAddedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $offer;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ExchangeAttempt $offer, User $user)
    {
        $this->user = $user;
        $this->offer = $offer;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.offer-added')->subject("ATEX - Your offer has been added");
    }
}
