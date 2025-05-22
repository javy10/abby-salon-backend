// ... existing code ...

protected $middlewareGroups = [
    'web' => [
        // ... existing code ...
        \App\Http\Middleware\RedirectToTestimoniosPublico::class,
    ],
    
    // ... existing code ...
];