@extends('mail.layout')

@section('title', 'ATEX - Your match has been declined!')
@section('preheader', 'Your match has been declined.')

@section('name', $user->name)

@section('content')
<p>
    One of your matches within the platform has just been declined.
    View the declined match here.
</p>
@stop

@section('cta-link', env('APP_URL') . '/app/my-matches')
@section('cta-text', 'View declined match')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop