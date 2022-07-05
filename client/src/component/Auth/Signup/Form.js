import React from 'react';
import Button from '../../../builder/PositiveButtonBuilder';

export default class SignUpForm extends React.Component{

    clickHandler = async () => {
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let passwordConfirmation = document.getElementById('password-confirmation').value;

        let createRequest = await fetch('/v1/user', {
            method: 'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify({
                username : username,
                email : email,
                password : password,
                password_confirmation : passwordConfirmation
            })
        });
        
        if(createRequest.status === 200 || createRequest.status === 201) window.location.replace('/home');
    }

    render() {
        return(
            <form className="flex flex-col justify-center ">
                <input type="text" id="username" placeholder="username"/>
                <input type="text" id="email" placeholder="E-Mail"/>
                <input type="password" id="password" placeholder="Password"/>
                <input type="password" id="password-confirmation" placeholder="Confirm Password"/>
                <Button message="Sign Up" callback={this.clickHandler}/>
            </form>
        );
    }
}