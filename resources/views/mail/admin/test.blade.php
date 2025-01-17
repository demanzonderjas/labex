@extends('mail.layout')

@section('title', 'LABEXUS - Test email')
@section('preheader', 'A test has been made')

@section('content')
    <p>
        A new test mail has just been sent
    </p>
@stop

@section('closing')
    <p>
        Friendly regards,<br />
        LABEXUS
    </p>
@stop
