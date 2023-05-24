@extends('mail.layout')

@section('title', 'ATEX - Your match has been approved!')
@section('preheader', 'Your match has been approved. Find the contact info here.')

@section('name', $user->name)

@section('content')
<p>
    One of your matches within the platform has just been approved.
</p>
<p>Please notify the animal department of the match and communicate which animals are involved.</p>
<p>The following note was added:</p>
<p>{!! $note !!}</p>
<p>
    You can contact your match via the following information to set up the exchange:
</p>
<ul>
    <li><strong>Name: </strong> {{ $contact->name }}</li>
    <li><strong>Email: </strong>{{ $contact->email }}</li>
    <li><strong>Organisation: </strong>{{ config('atex.' . $contact->organisation) ?? $contact->organisation }}</li>
</ul>
@stop

@section('cta-link', env('APP_URL') . '/app/my-matches')
@section('cta-text', 'View approved match')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop