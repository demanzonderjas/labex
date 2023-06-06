<?php

namespace App\Mail;

use App\ExchangeAttempt;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AttemptAddedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $attempt;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(ExchangeAttempt $attempt, User $user)
    {
        $this->user = $user;
        $this->attempt = $attempt;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.attempt-added')->subject("ATEX - Your " . $this->attempt->attempt_type . " has been added");
    }
}
