<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RedirectToTestimoniosPublico
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Si el usuario no está autenticado y la ruta no es testimonios-publico o relacionada
        if (!Auth::check() && 
            !$request->is('testimonios-publico') && 
            !$request->is('testimonios-publico/*') && 
            !$request->is('login') && 
            !$request->is('register') && 
            !$request->is('password/*') && 
            !$request->is('_debugbar/*') && 
            !$request->is('sanctum/*') && 
            !$request->is('api/*')) {
            
            return redirect()->route('testimonios.publico');
        }

        return $next($request);
    }
}