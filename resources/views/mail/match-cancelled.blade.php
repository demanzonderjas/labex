@extends('mail.layout')

@section('title', 'LABEXUS - Your match has been cancelled')
@section('preheader', 'Your match has been cancelled. The offer and request were reinserted into the system.')

@section('name', $user->name)

@section('content')
    <p>
        Your match has been cancelled.
        The offer and request were reinserted into the system, and the match was removed from your overview.
    </p>
@stop

@section('cta-link', env('APP_URL') . '/app')
@section('cta-text', 'View my dashboard')

@section('closing')
    <p>
        Friendly regards,<br />
        LABEXUS
    </p>
@stop
