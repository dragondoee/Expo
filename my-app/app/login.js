import React, { useState } from 'react';
import './styles/login.css';
import './styles/globals.css';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="login-container">
            <h1>Connexion</h1>

            <label>Adresse Email :
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />      
            </label>

            <label>Mot de passe :
            <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            </label>

            <button onClick={() => alert(`Email: ${email}\nPassword: ${password}`)}>Se connecter</button>
        </div>
    );
};


export default LoginScreen;