@extends('mail.layout')

@section('title', 'LABEXUS - A new offer has been added!')
@section('preheader', 'A new offer has been added. Check the details here.')

@section('content')
    <p>
        A new offer has just been added to the LABEXUS platform. It is currently on hold waiting to be activated.
    </p>
@stop

@section('cta-link', env('APP_URL') . '/admin/offers?status=on-hold')
@section('cta-text', 'View the offers that are on hold')

@section('closing')
    <p>
        Friendly regards,<br />
        LABEXUS
    </p>
@stop
