import { useState } from 'react';
import { getUser } from "../../utils/auth/getUser";


export default function Home({ }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const payload = await response.json();
        if (payload.message === 'User not found') {
            setMessage('User not found');
            return;
        }
        if (payload.message === 'Password does not match') {
            setMessage('Password does not match');
            return;
        }
        if (payload.user) {
            window.location.href = '/dashboard';
        }
    }


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col pt-0 items-center justify-center">
            <form class="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <h1 class="block text-gray-700 font-bold mb-2" for="username">
                        MEGA PEDIDOS - LOGIN
                    </h1>
                </div>
                <hr className="mb-4" />
                <div class="w-full mb-4">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        E-mail
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div class="w-full mb-4">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Password
                    </label>
                    <input
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="email"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div class="mb-6">
                    <p class="text-red-500 text-xs italic">{message}</p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    // verificando se o usuário está autenticado
    const { req, res } = context;
    const { authToken } = req.cookies;
    console.log(authToken);
    if (authToken) {
        const user = await getUser(authToken);
        if (user) {
            res.writeHead(302, { Location: '/dashboard' });
            res.end();
        }
    }

    return {
        props: {
        }
    }
};
