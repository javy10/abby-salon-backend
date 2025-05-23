<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Opinion;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aquí es donde puedes registrar las rutas de API para tu aplicación.
| Estas rutas son cargadas por el RouteServiceProvider dentro de un grupo
| que tiene el middleware "api" asignado.
|
*/

// Rutas para opiniones
Route::get('/opiniones', function () {
    return Opinion::all();
});

Route::post('/opiniones', function (Request $request) {
    $validatedData = $request->validate([
        'nombre_apellido' => 'required|string|max:255',
        'opinion' => 'required|string',
        'calificacion' => 'nullable|integer|min:1|max:5',
    ]);
    
    return Opinion::create($validatedData);
});