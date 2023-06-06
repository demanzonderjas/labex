@extends('mail.layout')

@section('title', 'ATEX - Your ' . $attempt->attempt_type . ' has been added!')
@section('preheader', 'Your ' . $attempt->attempt_type . ' has been added to the ATEX platform!')

@section('content')
<p>
    Your latest  {{ $attempt->attempt_type }} has just been added to the ATEX platform.
</p>
@if ($attempt->attempt_type === 'offer')
<p>Please notify your animal department that the animals were offered here.</p>
@endif
@stop

@section('cta-link', env('APP_URL') . '/app/' . $attempt->attempt_type .'s/select/' . $attempt->id)
@section('cta-text', 'View the ' . $attempt->attempt_type)

@section('closing')
<p>
    Friendly regards,<br />
    ATEX
</p>
@stop