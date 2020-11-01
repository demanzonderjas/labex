@extends('mail.layout')

@section('title', 'ATEX - A new match has been made!')
@section('preheader', 'A new match has been made. View the status here.')

@section('name', $user->name)

@section('content')
<p>
    A new match has just been registered in combination with your account. 
    View the status of the match within the platform. When approved, you can exchange your materials with the connected person.
</p>
@stop

@section('cta-link', env('APP_URL') . '/app/my-matches')
@section('cta-text', 'View your match status')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop