import 'bootstrap/dist/css/bootstrap.min.css';

import { redirect } from "react-router-dom";

const ErrorPage = ({ statusCode = 404, message = "Page Not Found" }) => {
    return (
        <div className="container-fluid vh-100 vw-100 d-flex flex-column align-items-center justify-content-center bg-light">
            <div className="text-center">
                <h1 className="display-1 text-danger">{statusCode}</h1>
                <h2 className="mb-3">Oops! {message}</h2>
                <p className="lead mb-4">
                    The page you are looking for either does not exist, you are not authorized or an error occurred.
                </p>
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => redirect('/')}
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
