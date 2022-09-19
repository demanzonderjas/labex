@extends('mail.layout')

@section('title', 'ATEX [' . $match->type . '] - A new match has been made!')
@section('preheader', 'A new match has been made. Check the details here.')

@section('name', $user->name)

@section('content')
<p>
    A new match has just been registered within the ATEX platform of the type: <strong>'{{ $match->type }}'</strong>.
    View the details of the match within the platform and decide if it is valid.
</p>
@stop

@section('cta-link', env('APP_URL') . '/admin/possible-matches')
@section('cta-text', 'View the match')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop