<?php

namespace App\Mail;

use App\MaterialMatch;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class AdminMatchApprovedEmail extends Mailable
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
    public function __construct(MaterialMatch $match, User $user, string $message)
    {
        $this->match = $match;
        $this->user = $user;
        $this->note = $message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mail.admin.match-approved')->subject("ATEX - A match you are involved with has been approved");
    }
}
