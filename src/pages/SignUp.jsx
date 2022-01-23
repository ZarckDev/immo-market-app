import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
// toastify
import { toast } from 'react-toastify';

// firebase
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
// firestore
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';

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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      // register the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // get the user for database
      const user = userCredential.user;

      // set the display name
      updateProfile(auth.currentUser, {
        displayName: formData.name,
      });

      // use a copy for saving in database (users collection just for profile rent and sale modification)
      const formDataCopy = { ...formData };
      delete formDataCopy.password; // remove password from the object ( no need for listings purposes)
      formDataCopy.timestamp = serverTimestamp(); // add timestamp from server

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      navigate('/');
    } catch (error) {
      toast.error("Une erreur s'est produite");
    }
  };

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Bienvenue !</p>
        </header>

        <form onSubmit={onSubmit}>
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
