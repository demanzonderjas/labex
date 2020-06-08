<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="api-user-token" content={{ Auth::user()->token }}>
    <link rel="stylesheet" href="/css/app.css?t={{ time() }}">
    <title>Exchange Platform Animals & Tissues</title>
</head>

<body>
    <div id="app"></div>
    <script src="/js/app.js?t={{ time() }}" type="text/javascript"></script>
</body>

</html>