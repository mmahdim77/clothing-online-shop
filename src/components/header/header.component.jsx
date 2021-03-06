import React from 'react';
import './header.styles.scss';
import { Link } from 'react-router-dom'
import {ReactComponent as Logo} from '../../assets/crown.svg'
import {auth} from '../../firebase/firebase.utils'
import {connect} from 'react-redux'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

const Header = ({currentUser , hidden}) => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>shop</Link>
            <Link className='option' to='/contact'>Contact</Link>
            
            {
                currentUser ?
                <span>Hi {currentUser.displayName}</span>
                :
                null
            }
            {
                currentUser ?
                
                <div className='option' onClick={()=> auth.signOut()}>sign out</div>
                :
                <Link className='option' to='/signin'>sign in</Link>
            }
            <CartIcon/>     
            
 
        </div>
        {
            hidden ? null : <CartDropdown/>
        }

    </div>
)

const mapStateToProps = ({user :{currentUser} , cart: {hidden}}) => ({
    currentUser,
    hidden
})

export default connect(mapStateToProps)(Header);