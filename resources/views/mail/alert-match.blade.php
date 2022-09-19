@extends('mail.layout')

@section('title', 'ATEX - A new possible match for your alert was found')
@section('preheader', 'ATEX - A new possible match for your alert was found.')

@section('content')
<p>
    There has just been added a new {{ $attempt->attempt_type }} that matched all of the criteria in your alert settings. Check out the details on the platform via the button below.
</p>
<p>
    If you want to disable these alerts, go to your <a href='{{ env('APP_URL') . '/app/alerts' }}'>Alert Settings</a>
</p>
@stop

@section('cta-link', env('APP_URL') . '/app/' . $attempt->attempt_type . 's/select/' . $attempt->id)
@section('cta-text', 'View the ' . $attempt->attempt_type)

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop