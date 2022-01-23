import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

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
          <p className='pageHeader'>Bienvenue !</p>
        </header>

        <form>
          <input
            type='text'
            className='nameInput'
            placeholder='Nom'
            id='name'
            value={formData.name}
            onChange={onChange}
          />
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

          <div className='signUpBar'>
            <p className='signUpText'>S'enregistrer</p>
            <button className='signUpButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        {/* Google OAuth */}
        <Link to='/sign-in' className='registerLink'>
          Déjà un compte ? Se connecter
        </Link>
      </div>
    </>
  );
}

export default SignUp;
