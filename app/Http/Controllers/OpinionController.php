<?php

namespace App\Http\Controllers;

use App\Models\Opinion;
use Illuminate\Http\Request;

use Inertia\Inertia;

class OpinionController extends Controller
{
    /**
     * Mostrar la página de opiniones.
     */
    public function index()
    {
        $opiniones = Opinion::orderBy('created_at', 'desc')->get();
        
        return Inertia::render('Testimonios', [
            'opiniones' => $opiniones
        ]);
    }

    /**
     * Almacenar una nueva opinión.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre_apellido' => 'required|string|max:255',
            'opinion' => 'required|string',
            'calificacion' => 'nullable|integer|min:1|max:5',
        ]);

        Opinion::create($validated);

        return redirect()->back()->with('success', 'Opinión guardada correctamente.');
    }
    
    /**
     * Mostrar la página pública de testimonios.
     */
    /**
     * Mostrar la página pública de testimonios.
     */
    public function publico()
    {
        return Inertia::render('public/testimonios-publico');
    }
    
    /**
     * Almacenar una nueva opinión desde la versión pública.
     */
    public function storePublico(Request $request)
    {
        $validated = $request->validate([
            'nombre_apellido' => 'required|string|max:255',
            'opinion' => 'required|string',
            'calificacion' => 'required|integer|min:1|max:5',
        ]);
        
        // Guardar el testimonio en la base de datos
        Opinion::create($validated);
        
        return redirect()->route('testimonios.publico')->with(
            'success', 'Opinión guardada correctamente.');
    }
}
