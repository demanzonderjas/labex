<?php

namespace App\Mail;

use App\MaterialMatch;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MatchDeclinedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $match;
    public $user;
    public $note;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(MaterialMatch $match, User $user, $note)
    {
        $this->match = $match;
        $this->user = $user;
        $this->note = $note;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.match-declined')->subject("ATEX - Your match has been declined");
    }
}
