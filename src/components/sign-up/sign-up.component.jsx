import React from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }


    }
    handleChange = event => {
        const { value, name } = event.target;

        this.setState({ [name]: value });
    };

    handleSubmit = async event => {
        event.preventDefault()
        const { displayName, email, password, confirmPassword } = this.state;
        if (password !== confirmPassword) {
            alert("passwords don't match");
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (err) {
            console.log(err)

        }
    }

    render() {
        return (
            <div className='sign-Up'>
                <h1>I Dont Have An Account</h1>
                <span>Sign Up With Your Email And Password</span>
                <form onSubmit= {this.handleSubmit}>

                    <FormInput name='displayName' label='DisplayName' type='text' value={this.state.displayName} handleChange={this.handleChange} />
                    <FormInput name='email' label='Email' type='email' value={this.state.email} handleChange={this.handleChange} />
                    <FormInput name='password' label='password' type='password' value={this.state.password} handleChange={this.handleChange} />
                    <FormInput name='confirmPassword' label='confirm password' type='password' value={this.state.confirmPassword} handleChange={this.handleChange} />
                    <CustomButton type='submit' >SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}
export default SignUp;