import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { addUser } = useContext(UserContext);

    // Validación del formulario
    const validateForm = ({ name, email, phone }) => {
        const errors = {};

        // Validar nombre (debe contener "-" o "." y solo letras)
        if (!name) {
            errors.name = 'El nombre es requerido';
        } else if (!/^[a-zA-Z]+[.-][a-zA-Z]+$/.test(name)) {
            errors.name = 'El nombre debe ser separado por "-" o "." (ejemplo: david-cantuna)';
        }

        // Validar email
        if (!email) {
            errors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Email inválido';
        }

        // Validar teléfono (solo números, 10 dígitos)
        if (!phone) {
            errors.phone = 'El celular es requerido';
        } else if (!/^\+?[0-9]{10}$/.test(phone)) {
            errors.phone = 'El celular debe contener solo números y tener 10 dígitos';
        }

        return errors;
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
        setErrors((prev) => ({ ...prev, name: '' }));
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors((prev) => ({ ...prev, email: '' }));
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setErrors((prev) => ({ ...prev, phone: '' }));
    };

    // Registrar Usuario
    const sendUser = async (e) => {
        e.preventDefault();
        const user = { name, email, phone };

        // Validar formulario
        const validationErrors = validateForm(user);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true); // Estado de cargando
        try {
            await addUser(user);
            alert('Registro exitoso, correo enviado');
            setName('');
            setEmail('');
            setPhone('');
            setErrors({});
        } catch (err) {
            if (err.response && err.response.status === 400 && err.response.data.error) {
                setErrors({ email: err.response.data.error });
            } else {
                setErrors({ general: 'Error al registrar el usuario. Inténtalo de nuevo.' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form className="space-y-4 w-full max-w-md" onSubmit={sendUser}>
                {errors.general && (
                    <p className="text-sm text-red-600">{errors.general}</p>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Nombre
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        className={`mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                        disabled={isLoading}
                    />
                    {errors.name && (
                        <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        className={`mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Celular</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className={`mt-1 block w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                        disabled={isLoading}
                    />
                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className={`w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    disabled={isLoading}
                >
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </div>
    );
};