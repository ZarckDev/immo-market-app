import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// firestore
import { doc, getDoc } from 'firebase/firestore';

// firebase
import { db } from '../firebase.config';

function Contact() {
  const [message, setMessage] = useState('');
  const [owner, setOwner] = useState(null);
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getOwner = async () => {
      const docRef = doc(db, 'users', params.ownerId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error('Impossible de récupérer les informations du propriétaire');
      }
    };

    getOwner();
  }, [params.ownerId]);

  const onChange = (e) => setMessage(e.target.value);

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contacter le propriétaire</p>
      </header>

      {owner !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contacter {owner?.name}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${owner.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Envoyer le Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
}

export default Contact;