@extends('mail.layout')

@section('title', 'ATEX - A new match has been made!')
@section('preheader', 'A new match has been made. View the status here.')

@section('content')
<p>
    A match has been made, awesome! :)
    Match has been made for the amount of: {{ $match->exchangeOffer->amount }} animals
</p>
@stop

@section('cta-link', 'https://atex.uu.nl')
@section('cta-text', 'View your match status')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop