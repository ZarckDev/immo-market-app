import { useLocation, useNavigate } from 'react-router-dom';
// toastify
import { toast } from 'react-toastify';

// firebase
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { db } from '../firebase.config';
// firestore
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user, doesn't exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate('/');
    } catch (error) {
      toast.error('Connexion impossible avec Google');
    }
  };

  return (
    <div className='socialLogin'>
      <p>
        {location.pathname === '/sign-up' ? "S'enregistrer" : 'Se connecter'}{' '}
        avec{' '}
      </p>
      <button className='socialIconDiv' onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt='google' />
      </button>
    </div>
  );
}

export default OAuth;
