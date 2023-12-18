@extends('mail.layout')

@section('title', 'ATEX - Your offer which is suitable for adoption offer has reached the available end date')
@section('preheader',
    'Your offer which is suitable for adoption offer has reached the available end date. Check the
    details here.')

@section('content')
    <p>
        Your offer has reached the available end date. Please contact the Animal welfare body to discuss the remaining
        animals.
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