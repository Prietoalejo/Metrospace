
import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase'; 

function LoginPage() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null); // Limpiar errores anteriores

    const provider = new GoogleAuthProvider();
    provider.addScope('profile'); 
    provider.addScope('email');  

    try {
      // Abre una ventana emergente para que el usuario inicie sesión con Google
      const result = await signInWithPopup(auth, provider);

      // Informacion del usuario
      const user = result.user;
      console.log('Usuario de Google autenticado:', user);

      // Puedes redirigir al usuario o actualizar el estado de autenticación global
      // navigate('/home'); // Si usas react-router-dom, por ejemplo
      alert('Inicio de sesión con Google exitoso!');

    } catch (err) {
      // Manejo de errores
      console.error('Error al iniciar sesión con Google:', err);
      // Muestra un mensaje de error al usuario
      switch (err.code) {
        case 'auth/popup-closed-by-user':
          setError('El inicio de sesión con Google fue cancelado.');
          break;
        case 'auth/cancelled-popup-request':
          setError('Ya hay una ventana emergente abierta. Por favor, complétala.');
          break;
        case 'auth/account-exists-with-different-credential':
          setError('Ya existe una cuenta con este correo electrónico usando otro método de inicio de sesión.');
          break;
        default:
          setError(`Error al iniciar sesión: ${err.message}`);
          break;
      }
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      {isLoading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleGoogleSignIn} disabled={isLoading}>
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
      </button>

      {/* Aquí se anaden los inputs para correo y contraseña, y otros botones */}
    </div>
  );
}

export default LoginPage;