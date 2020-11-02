@extends('mail.layout')

@section('title', 'ATEX - Your match has been approved!')
@section('preheader', 'Your match has been approved. Find the contact info here.')

@section('name', $user->name)

@section('content')
<p>
    One of your matches within the platform has just been approved.
    View the match so you can see the connected person you are matched with.
</p>
@stop

@section('cta-link', env('APP_URL') . '/app/my-matches')
@section('cta-text', 'View approved match')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop