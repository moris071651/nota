import 'bootstrap/dist/css/bootstrap.min.css'

import { useState } from 'react'
import useSession from '../hooks/useSession';


const SignUpPage = () => {
    const [error, setError] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [retypedPassword, setRetypedPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();

        setError('');

        if (username.length < 3) {
            return setError('Username must be at least 3 characters long');
        }

        if (password.length < 6) {
            return setError('Password must be at least 6 characters long');
        }

        if (password !== retypedPassword) {
            return setError('Passwords do not match');
        }

        fetch("http://nota_server:5000/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            return response.json();
        })
        .then(data => {
            console.log(data)
            if ('error' in data) {
                setError(data['error']);
            }
            else {
                if (data['success'] == 'User created') {
                    const { saveToken } = useSession();
                    saveToken(true);
                    location.href = '/';
                }
                else {
                    setError(data['success']);
                }
            }
        })
        .catch(error => {
            setError('Error: ' + error);
        });
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
                            <div className="mb-3">
                                <label htmlFor="retype-password" className="form-label">Password Again</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="retype-password"
                                    placeholder="Enter password Again"
                                    value={retypedPassword}
                                    onChange={(e) => setRetypedPassword(e.target.value)}
                                />
                            </div>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;