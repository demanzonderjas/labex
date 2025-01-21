@extends('mail.layout')

@section('title', 'LABEXUS - You have a new match!')
@section('preheader', 'You have a new match! Find the contact info here.')

@section('name', $user->name)

@section('content')
    <p>
        You have a new match! Check out the details below.
    </p>
    <h3>Offer</h3>
    <ul>
        <li>
            {{ $match->offer->title }}
        </li>
        <li>
            {{ $match->offer->description }}
        </li>
    </ul>
    <h3>Request</h3>
    <ul>
        <li>
            {{ $match->request->title }}
        </li>
        <li>
            {{ $match->request->description }}
        </li>
    </ul>
    <p>
        You can contact your match via the following information to set up the exchange:
    </p>
    <ul>
        <li>{{ $contact->name }}</li>
        <li>{{ $contact->email }}</li>
    </ul>
@stop

@section('cta-link', env('APP_URL') . '/app/my-matches')
@section('cta-text', 'View match')

@section('closing')
    <p>
        Friendly regards,<br />
        LABEXUS
    </p>
@stop
