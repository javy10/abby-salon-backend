<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OpinionController;
use Inertia\Inertia;
use App\Models\Opinion;

// Rutas públicas para testimonios (accesibles para todos)
Route::get('/testimonios-publico', [OpinionController::class, 'publico'])->name('testimonios.publico');
Route::post('/testimonios-publico', [OpinionController::class, 'storePublico'])->name('testimonios.store.publico');

// Ruta de inicio (será redirigida a testimonios-publico para usuarios no autenticados)
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Rutas protegidas (solo para usuarios autenticados)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::get('testimonios', function () {
        $opiniones = Opinion::orderBy('created_at', 'desc')->get();
        return Inertia::render('testimonios', [
            'opiniones' => $opiniones,
            'success' => session('success')
        ]);
    })->name('testimonios');

    // Ruta para procesar el envío del formulario de opiniones
    Route::post('testimonios', function (\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'nombre_apellido' => 'required|string|max:255',
            'opinion' => 'required|string',
            'calificacion' => 'nullable|integer|min:1|max:5',
        ]);
        
        Opinion::create($validated);
        
        return redirect()->back()->with('success', 'Opinión guardada correctamente.');
    })->name('testimonios.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Elimina la sección de API para opiniones que estaba aquí


