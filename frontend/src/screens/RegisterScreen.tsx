import React from 'react';
import Button from 'react-bootstrap/Button';
import Benefits from '../components/Benefits';

const RegisterScreen = () => {
    function handleSublitBtn() {
        console.log('RegisterScreen submit')
    }

    return (
        <>
            <div className="column-wrapper">
                <Benefits/>
                <div className="register">
                    <h1>Sign up for an account</h1>
                    <p>Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is
                        required to to continue.</p>
                    <form onSubmit={handleSublitBtn}>
                        <div className="form-row">
                            <div className="col-md-9 mb-3">
                                <label htmlFor="validationServerUsername">Username</label>
                                <div className="input-group">
                                    <input type="text" className="form-control is-invalid" id="validationServerUsername"
                                           placeholder="Username" aria-describedby="inputGroupPrepend3" required/>
                                    <div className="invalid-feedback">
                                        Please choose a username.
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9 mb-3">
                                <label htmlFor="validationServerPassword">Password</label>
                                <div className="input-group">
                                    <input type="text" className="form-control is-invalid" id="validationServerPassword"
                                           placeholder="Password" aria-describedby="inputGroupPrepend3" required/>
                                    <div className="invalid-feedback">
                                        Please choose a password.
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9 mb-3">
                                <label htmlFor="validationServerConfirmPassword">Confirm Password</label>
                                <div className="input-group">
                                    <input type="text" className="form-control is-invalid"
                                           id="validationServerConfirmPassword" placeholder="Confirm Password"
                                           aria-describedby="inputGroupPrepend3" required/>
                                    <div className="invalid-feedback">
                                        Please confirm a password.
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-9 mb-3">
                                <label htmlFor="validationServerEmail">Email</label>
                                <div className="input-group">
                                    <input type="text" className="form-control is-invalid" id="validationServerEmail"
                                           placeholder="Email" aria-describedby="inputGroupPrepend3" required/>
                                    <div className="invalid-feedback">
                                        Please choose email.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button variant="info" className="me-2">Sign Up</Button>
                        <a href='/api/cancel'>Cancel</a>

                    </form>
                </div>
            </div>
        </>


    );
}

export default RegisterScreen;