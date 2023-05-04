@extends('mail.layout')

@section('title', 'ATEX - Your offer has been added!')
@section('preheader', 'Your offer has been added to the ATEX platform!')

@section('content')
<p>
    Your latest offer has just been added to the ATEX platform.
</p>
<p>Please notify your animal department that the animals were offered here.</p>
@stop

@section('cta-link', env('APP_URL') . '/app/offers/select/' . $offer->id)
@section('cta-text', 'View the offer')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop