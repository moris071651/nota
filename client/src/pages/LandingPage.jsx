import 'bootstrap/dist/css/bootstrap.min.css';

import { redirect } from 'react-router-dom';
import useSession from '../hooks/useSession';

const LandingPage = () => {
    let { getToken } = useSession()

    return (
        <div className="container-fluid vh-100 vw-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="text-center">
                <h1 className="display-4 mb-4">Welcome to Nota</h1>
                <p className="lead mb-4">
                    A simple note-taking app to help you stay organized and productive.
                </p>

                {getToken() ? (
                    <button
                        className="btn btn-success btn-lg"
                        onClick={() => window.location.href = '/dashboard'}
                    >
                        Go to Dashboard
                    </button>
                ) : (
                    <>
                        <button
                            className="btn btn-primary btn-lg me-3"
                            onClick={() => redirect('/login')}
                        >
                            Login
                        </button>
                        <button
                            className="btn btn-outline-primary btn-lg"
                            onClick={() => window.location.href = '/signup'}
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
