import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Opinion',
        href: '/testimonios',
    },
];

// Especificamos el tipo de opiniones como un array de Opinion
export default function Testimonios({ success = null }: { success: string | null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre_apellido: '',
        opinion: '',
        calificacion: 0,
    });
    
    const [hoverRating, setHoverRating] = useState(0);

    // Mostrar SweetAlert cuando hay un mensaje de éxito
    useEffect(() => {
        if (success) {
            Swal.fire({
                title: '¡Éxito!',
                text: success,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
            });
        }
    }, [success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('testimonios.store'), {
            onSuccess: () => {
                reset('nombre_apellido', 'opinion', 'calificacion');
                // Mostrar SweetAlert directamente aquí
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Opinión guardada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#3085d6',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Testimonios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Agregar Opinion</CardTitle>
                        <CardDescription>Comparte tu experiencia con nosotros</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="nombre_apellido" className="text-sm font-medium">Nombre y Apellido</label>
                                <Input 
                                    id="nombre_apellido"
                                    value={data.nombre_apellido}
                                    onChange={(e) => setData('nombre_apellido', e.target.value)}
                                    placeholder="Ingresa tu nombre y apellido"
                                    required
                                />
                                {errors.nombre_apellido && (
                                    <div className="text-sm text-red-500">{errors.nombre_apellido}</div>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="opinion" className="text-sm font-medium">Ingresa tu opinión</label>
                                <Textarea 
                                    id="opinion"
                                    value={data.opinion}
                                    onChange={(e) => setData('opinion', e.target.value)}
                                    placeholder="Escribe tu opinion aquí"
                                    rows={4}
                                    required
                                />
                                {errors.opinion && (
                                    <div className="text-sm text-red-500">{errors.opinion}</div>
                                )}
                            </div>
                            
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Califica el servicio obtenido</label>
                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setData('calificacion', star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`h-6 w-6 ${
                                                    (hoverRating || data.calificacion) >= star
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'text-gray-300'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                    <span className="ml-2 text-sm">
                                        {data.calificacion > 0 ? `${data.calificacion} de 5 estrellas` : 'Sin calificar'}
                                    </span>
                                </div>
                                {errors.calificacion && (
                                    <div className="text-sm text-red-500">{errors.calificacion}</div>
                                )}
                            </div>
                            
                            <br />

                            <Button type="submit" className="w-full md:w-auto" disabled={processing}>
                                Enviar Mi Opinion
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                
                {/* Se ha eliminado la sección de "Opiniones recibidas" */}
            </div>
        </AppLayout>
    );
}