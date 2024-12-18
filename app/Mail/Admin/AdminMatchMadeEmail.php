<?php

namespace App\Mail\Admin;

use App\MaterialMatch;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminMatchMadeEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $match;
    public $user;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(MaterialMatch $match, User $user)
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
        return $this->view('mail.admin.match-made')->subject("LABEXUS [" . $this->match->type . "] - A new match has been made!");
    }
}
