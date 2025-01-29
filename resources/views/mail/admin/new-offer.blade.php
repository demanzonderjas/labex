@extends('mail.layout')

@section('title', 'LABEXUS - A new offer has been added!')
@section('preheader', 'A new offer has been added. Check the details here.')

@section('content')
    <p>
        A new offer has just been added to the LABEXUS platform.
    </p>
@stop

@section('cta-link', env('APP_URL') . '/app/offers/select/' . $attempt->id)
@section('cta-text', 'View the offer')

@section('closing')
    <p>
        Friendly regards,<br />
        LABEXUS
    </p>
@stop
