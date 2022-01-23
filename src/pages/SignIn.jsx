import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const onChange = (e) => {
    // as we are using this function for both email and password
    setFormData((state) => ({
      ...state, // get all current values
      [e.target.id]: e.target.value, // update the one concerned
    }));
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>De retour parmis nous ?</p>
        </header>

        <form>
          <input
            type='email'
            className='emailInput'
            id='email'
            placeholder='Email'
            value={formData.email}
            onChange={onChange}
          />

          <div className='passwordInputDiv'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='passwordInput'
              placeholder='Mot de passe'
              id='password'
              value={formData.password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              alt='show password'
              className='showPassword'
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>

          <Link to='/forgot-password' className='forgotPasswordLink'>
            Mot de passe oublié ?
          </Link>

          <div className='signInBar'>
            <p className='signInText'>Se connecter</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-up' className='registerLink'>
          S'enregistrer
        </Link>
      </div>
    </>
  );
}

export default SignIn;
