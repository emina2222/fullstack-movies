import React from 'react';
import Button from 'react-bootstrap/Button';


const LoginScreen = () => {

    function handleSubmitBtn() {
        console.log('submit')
    }

    return (
        <>
            <h3>Login to your account</h3>
            <p>In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations you
                will need to login to your account. If you do not have an account, registering for an account is free
                and simple. Click here to get started. If you signed up but didn't get your verification email, click
                here to have it resent.</p>


            <form onSubmit={handleSubmitBtn}>
                <div className="form-row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationServerUsername">Username</label>
                        <div className="input-group">
                            <input type="text" className="form-control is-invalid" id="validationServerUsername"
                                   placeholder="Username" aria-describedby="inputGroupPrepend3" required/>
                            <div className="invalid-feedback">
                                Please choose a username.
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="validationServerPassword">Password</label>
                        <div className="input-group">
                            <input type="text" className="form-control is-invalid" id="validationServerPassword"
                                   placeholder="Password" aria-describedby="inputGroupPrepend3" required/>
                            <div className="invalid-feedback">
                                Please choose a password.
                            </div>
                        </div>
                    </div>
                </div>

                <Button variant="info" className="me-2">Login</Button>
                <a href='/api/reset-password'>Reset password</a>

            </form>
        </>


    );
}

export default LoginScreen;