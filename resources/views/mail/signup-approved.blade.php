@extends('mail.layout')

@section('title', 'ATEX - Your sign up has been approved!')
@section('preheader', 'Your sign up has been approved. Log in and discover ATEX.')

@section('name', $signup->name)

@section('content')
<p>
    Your sign up has been approved.
    You can now log in with your university account and access the ATEX platform.
</p>
@stop

@section('cta-link', env('APP_URL'))
@section('cta-text', 'Log in')

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop