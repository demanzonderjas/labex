<?php

namespace App\Mail;

use App\MaterialMatch;
use App\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MatchApprovedEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $match;
    public $user;
    public $note;
    public $contact;

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
        $this->contact = $this->getContactFromMatch();
    }

    private function getContactFromMatch(): User
    {
        return $this->match->offer->user->id === $this->user->id ? $this->match->request->user : $this->match->offer->user;
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
