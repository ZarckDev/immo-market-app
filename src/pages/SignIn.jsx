import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
// toastify
import { toast } from 'react-toastify';

// firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      // register the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      if (userCredential.user) {
        navigate('/');
      }
    } catch (error) {
      let error_msg = '';
      if (error.code === 'auth/wrong-password') {
        error_msg = 'Mot de passe incorrect';
      } else if (error.code === 'auth/invalid-email') {
        error_msg = 'Email incorrect';
      } else if (error.code === 'auth/user-not-found') {
        error_msg = 'Email inconnu';
      } else if (error.code === 'auth/too-many-requests') {
        error_msg = 'Trop de tentatives, réessayez dans quelques instants';
      } else {
        error_msg = 'Identifiants inconnus';
      }
      toast.error(error_msg);
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>De retour parmis nous ?</p>
        </header>

        <form onSubmit={onSubmit}>
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
