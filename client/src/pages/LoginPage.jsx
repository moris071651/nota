import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import useSession from '../hooks/useSession'

const LoginPage = () => {
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault()

        if (password.length < 8) {
            setError('Password Too Short');
        }

        if (username.length < 3) {
            setError('Username Too Short');
        }

        const { saveToken } = useSession();


        // if (email)

        // redirect('/dashboard')
    }

    return (
        <div className="container-fluid vh-100 vw-100 d-flex flex-column justify-content-center bg-light">
            <div className="row h-100">
                <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                    <div className="w-100 p-4" style={{ maxWidth: '500px' }}>
                        <h2 className="text-center mb-4">Login</h2>
                        <form onSubmit={handleLogin} className="p-4 border rounded bg-white shadow">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="alert alert-danger alert-dismissible">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
