<?php

namespace App\Mail;

use App\Match;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MatchApprovedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $match;
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Match $match, User $user)
    {
        $this->match = $match;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.match-approved')->subject("ATEX - Your match has been approved!");
    }
}
