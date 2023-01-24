@extends('mail.layout')

@section('title', 'ATEX - A new user has been made!')
@section('preheader', 'A new user has signed up. Check the details here.')

@section('content')
    <p>
        A new user has just signed up to gain access to the ATEX platform.
        Their details to contact them:
    </p>
    <p>
        Name: {{ $signup->name }}<br />
        Email: {{ $signup->email }}<br />
        Organisation: {{ $signup->organisation }}<br />
    </p>
@stop

@section('cta-link', env('APP_URL') . '/admin/signups')
@section('cta-text', 'View the sign up')

@section('closing')
    <p>
        Friendly regards,<br />
        ATEX
    </p>
@stop
