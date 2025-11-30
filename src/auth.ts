import type { AuthenticationResponse } from "./types";

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export const setAuth = (authRes: AuthenticationResponse) => {
    localStorage.setItem(TOKEN_KEY, authRes.token);
    localStorage.setItem(USER_KEY, JSON.stringify(authRes.user));
}

export const removeAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY) || '{}');

export const isAuthenticated = () => !!getToken();

export const register = async (username: string, password: string, fullName: string, email: string, tel: string) => {
    const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName, email, tel })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    const authResponse: AuthenticationResponse = await response.json();
    setAuth(authResponse);
    window.location.href = '/dashboard';
}

export const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
    }
    const authResponse: AuthenticationResponse = await response.json();
    setAuth(authResponse);
    window.location.href = '/dashboard';
}

export const logout = () => removeAuth();