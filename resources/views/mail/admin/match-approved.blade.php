@extends('mail.layout')

@section('title', 'ATEX - A match you are involved with has been approved')
@section('preheader', 'A match you are involved with has been approved.')

@section('name', $user->name)

@section('content')
    <p>
        One of your matches within the platform has just been approved by the other connected administrator.
    </p>
    <p>The following note was added:</p>
    <p>{!! $note !!}</p>
@stop

@section('cta-link', env('APP_URL') . '/admin/matches')
@section('cta-text', 'View approved match')

@section('closing')
    <p>
        Friendly regards,<br />
        ATEX
    </p>
@stop
