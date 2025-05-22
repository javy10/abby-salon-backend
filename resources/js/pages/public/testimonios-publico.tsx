import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';

export default function TestimoniosPublico({ success = null }: { success: string | null }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre_apellido: '',
        opinion: '',
        calificacion: 0,
    });
    
    const [hoverRating, setHoverRating] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Mostrar el formulario con animación después de cargar
    useEffect(() => {
        setIsVisible(true);
    }, []);

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
        
        // Validar que todos los campos estén completos
        if (!data.nombre_apellido || !data.opinion || data.calificacion === 0) {
            // Mostrar mensaje de error con SweetAlert
            Swal.fire({
                title: '¡Error!',
                text: 'Por favor completa todos los campos, incluyendo la calificación.',
                icon: 'error',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#f39c12',
            });
            return; // Detener la ejecución
        }
        
        // Primero mostrar SweetAlert de procesamiento
        Swal.fire({
            title: 'Procesando...',
            text: 'Estamos guardando tu opinión',
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
                
                // Enviar los datos después de mostrar el SweetAlert
                post(route('testimonios.store.publico'), {
                    onSuccess: () => {
                        // Cerrar el SweetAlert de procesamiento
                        Swal.close();
                        
                        // Mostrar SweetAlert de éxito
                        Swal.fire({
                            title: '¡Éxito!',
                            text: 'Opinión guardada correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#3085d6',
                        }).then(() => {
                            // Ocultar el formulario con animación después de cerrar el SweetAlert
                            setIsVisible(false);
                            
                            // Pequeño retraso para permitir que la animación termine
                            setTimeout(() => {
                                reset('nombre_apellido', 'opinion', 'calificacion');
                                // Volver a mostrar el formulario con animación
                                setIsVisible(true);
                            }, 300);
                        });
                    },
                    onError: () => {
                        // Cerrar el SweetAlert de procesamiento
                        Swal.close();
                        
                        // Mostrar SweetAlert de error
                        Swal.fire({
                            title: '¡Error!',
                            text: 'Hubo un problema al guardar tu opinión. Inténtalo de nuevo.',
                            icon: 'error',
                            confirmButtonText: 'Entendido',
                            confirmButtonColor: '#f39c12',
                        });
                    }
                });
            }
        });
    };
    
    // Función para limpiar el formulario
    const handleCancel = () => {
        // Animación de "sacudida" antes de limpiar
        const formElement = document.querySelector('form');
        if (formElement) {
            formElement.classList.add('shake-animation');
            setTimeout(() => {
                formElement.classList.remove('shake-animation');
                reset('nombre_apellido', 'opinion', 'calificacion');
                setHoverRating(0);
            }, 500);
        } else {
            reset('nombre_apellido', 'opinion', 'calificacion');
            setHoverRating(0);
        }
    };

    // Variantes de animación para el contenedor principal
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
                duration: 0.5,
                ease: "easeOut",
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        },
        exit: { 
            opacity: 0, 
            scale: 0.9,
            transition: { 
                duration: 0.3,
                ease: "easeIn",
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    };

    // Variantes para los elementos hijos
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
        exit: { y: -20, opacity: 0, transition: { duration: 0.2 } }
    };

    // Variantes para los botones
    const buttonVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.3, delay: 0.3 } },
        exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.1 } }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Compartir tu Opinión" />
            
            {/* Reemplazar el estilo JSX con un estilo global usando createGlobalStyle */}
            <style dangerouslySetInnerHTML={{ __html: `
                .shake-animation {
                    animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                }
                
                @keyframes shake {
                    10%, 90% { transform: translate3d(-1px, 0, 0); }
                    20%, 80% { transform: translate3d(2px, 0, 0); }
                    30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                    40%, 60% { transform: translate3d(4px, 0, 0); }
                }
                
                .star-animation {
                    transition: all 0.3s ease;
                }
                
                .star-animation:hover {
                    transform: scale(1.2) rotate(5deg);
                }
                
                textarea {
                    resize: none !important;
                }
            `}} />
            
            <AnimatePresence mode="wait">
                {isVisible && (
                    <motion.div 
                        className="max-w-md mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key="form-container"
                    >
                        <Card className="w-full bg-black/80 text-white border-0 overflow-hidden">
                            <CardHeader className="text-center">
                                <motion.div variants={itemVariants}>
                                    <CardTitle className="text-2xl font-bold">Comparte tu Opinión</CardTitle>
                                </motion.div>
                                <motion.div variants={itemVariants}>
                                    <CardDescription className="text-gray-300">Nos interesa conocer tu experiencia con nosotros</CardDescription>
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <label htmlFor="nombre_apellido" className="text-sm font-medium">Nombre y Apellido</label>
                                        <Input 
                                            id="nombre_apellido"
                                            value={data.nombre_apellido}
                                            onChange={(e) => setData('nombre_apellido', e.target.value)}
                                            placeholder="Ingresa tu nombre y apellido"
                                            required
                                            className="bg-black/50 border-gray-700 text-white"
                                        />
                                        {errors.nombre_apellido && (
                                            <div className="text-sm text-red-500">{errors.nombre_apellido}</div>
                                        )}
                                    </motion.div>
                                    
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <label htmlFor="opinion" className="text-sm font-medium">Ingresa tu opinión</label>
                                        <Textarea 
                                            id="opinion"
                                            value={data.opinion}
                                            onChange={(e) => setData('opinion', e.target.value)}
                                            placeholder="Escribe tu opinion aquí"
                                            rows={8}
                                            required
                                            maxLength={250}
                                            className="bg-black/50 border-gray-700 text-white w-full font-normal text-base"
                                            style={{ 
                                                resize: "none", 
                                                minWidth: "100%", 
                                                letterSpacing: "normal", 
                                                wordSpacing: "normal",
                                                overflow: "auto",
                                                height: "auto",
                                                minHeight: "180px"
                                            }}
                                        />
                                        <div className="flex justify-end">
                                            <span className={`text-xs ${data.opinion.length > 200 ? 'text-yellow-400' : 'text-gray-400'}`}>
                                                {data.opinion.length}/250 caracteres
                                            </span>
                                        </div>
                                        {errors.opinion && (
                                            <div className="text-sm text-red-500">{errors.opinion}</div>
                                        )}
                                    </motion.div>
                                    
                                    <motion.div className="space-y-2" variants={itemVariants}>
                                        <label className="text-sm font-medium">Califica el servicio obtenido</label>
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setData('calificacion', star)}
                                                    onMouseEnter={() => setHoverRating(star)}
                                                    onMouseLeave={() => setHoverRating(0)}
                                                    className="focus:outline-none star-animation"
                                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Star
                                                        className={`h-6 w-6 ${
                                                            (hoverRating || data.calificacion) >= star
                                                                ? 'fill-yellow-400 text-yellow-400'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </motion.button>
                                            ))}
                                            <span className="ml-2 text-sm">
                                                {data.calificacion > 0 ? `${data.calificacion} de 5 estrellas` : 'Sin calificar'}
                                            </span>
                                        </div>
                                        {errors.calificacion && (
                                            <div className="text-sm text-red-500">{errors.calificacion}</div>
                                        )}
                                    </motion.div>
                                    
                                    <motion.div 
                                        className="flex justify-between gap-4 pt-2" 
                                        variants={itemVariants}
                                    >
                                        <motion.div
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="w-1/2"
                                        >
                                            <Button 
                                                type="button" 
                                                onClick={handleCancel}
                                                className="w-full bg-[#f1c40f] hover:bg-[#f39c12]" // Color amarillo de warning
                                            >
                                                Cancelar
                                            </Button>
                                        </motion.div>
                                        <motion.div
                                            variants={buttonVariants}
                                            whileHover="hover"
                                            whileTap="tap"
                                            className="w-1/2"
                                        >
                                            <Button 
                                                type="submit" 
                                                className="w-full bg-[#17a2b8] hover:bg-[#138496]" // Color azul de info
                                                disabled={processing}
                                            >
                                                Enviar Mi Opinión
                                            </Button>
                                        </motion.div>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}