import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { signInWithEmailAndPassword, signInWithGoogle } from "./firebase"; // Import appropriate authentication methods

function LoginPage() {
    const { currentUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Function to handle email/password login
    const handleEmailPasswordLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    // Function to handle Google sign-in
    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Login Page</h2>
            {error && <div>{error}</div>}
            <form onSubmit={handleEmailPasswordLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login with Email/Password</button>
            </form>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
}

export default LoginPage;
