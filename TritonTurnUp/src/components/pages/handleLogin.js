import { account } from './appwrite'; // Adjust the path if necessary

const loginButton = document.getElementById('google-login-button');

export const handleLogin = async () => {
    try {
        await account.createOAuth2Session(
            'google',                // OAuth provider (e.g., Google)
            'http://localhost:5173/', // Success URL
            'http://localhost:5173/fail' // Failure URL
        );
        console.log('Login successful');
    } catch (error) {
        console.error('Login failed:', error);
    }
}

