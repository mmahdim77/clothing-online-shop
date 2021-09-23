import React from 'react'
import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {auth , signInWithGoogle} from '../../firebase/firebase.utils'

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const{email,password} = this.state;

        try{
            await auth.signInWithEmailAndPassword(email , password)
            this.setState ({ email: '', password: '' });

        }catch (err){
            console.log(err)
        }

    };

   



    render() {
        return (
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>sign in with your email and password</span>

                <form className = 'sign-up-form' onSubmit= {this.handleSubmit}>
                    <FormInput label='Email' name='email' type="email" handleChange={this.handleChange} value={this.state.email} />
                    <FormInput label='Password' name='password' type="password" handleChange={this.handleChange} value={this.state.password} />
                    <CustomButton type = "submit" >sign in </CustomButton>
                    <CustomButton onClick ={signInWithGoogle} isGoogleSignIn > Sign In With Google </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignIn;