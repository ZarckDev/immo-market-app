import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//toastify
import { toast } from 'react-toastify';

// firebase
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { db } from '../firebase.config';
// firestore
import { updateDoc, doc } from 'firebase/firestore';

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const navigate = useNavigate();

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  // update details
  const onSubmit = async () => {
    try {
      // something to update ?
      auth.currentUser.displayName !== name && // Update display name
        (await updateProfile(auth.currentUser, {
          displayName: name,
        }));

      auth.currentUser.email !== email && // Update email
        (await updateEmail(auth.currentUser, email));

      // Update our db in firestore
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
        email,
      });

      toast.success('Profil mis à jour');
    } catch (error) {
      toast.error('Impossible de mettre à jour le profil');
    }
  };

  // field change
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>Mon Profil</p>
        <button type='button' className='logOut' onClick={onLogout}>
          Se déconnecter
        </button>
      </header>

      <main>
        <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Informations personnelles</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prevState) => !prevState); // switch change details state
            }}
          >
            {changeDetails ? 'Sauvegarder' : 'Mettre à jour'}
          </p>
        </div>

        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profile;
