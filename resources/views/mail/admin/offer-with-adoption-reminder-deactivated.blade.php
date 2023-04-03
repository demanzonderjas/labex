@extends('mail.layout')

@section('title', 'ATEX - An offer which is suitable for adoption will soon be deactivated!')
@section('preheader', 'An offer which is suitable for adoption will soon be deactivated. Check the details here.')

@section('content')
    <p>
        An offer which is suitable for adoption will soon be deactivated on the ATEX platform.
    </p>
@stop

@section('cta-link', env('APP_URL') . '/app/offers/select/' . $attempt->id)
@section('cta-text', 'View the offer')

@section('closing')
    <p>
        Friendly regards,<br />
        ATEX
    </p>
@stop
