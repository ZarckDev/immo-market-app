import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

//firebase
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

// firestore
import { getDoc, doc } from 'firebase/firestore';

// component
import Spinner from '../components/Spinner';

import shareIcon from '../assets/svg/shareIcon.svg';

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      // fetch our doc from firestore
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };

    fetchListing();
  }, [navigate, params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      {/* SLIDER */}

      {/* Link copy share */}
      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          //   Just a delay to say that link has been copied
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <img src={shareIcon} alt='partager' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Lien copié</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} -{' '}
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
          €
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          {listing.type === 'louer' ? 'Location' : 'Vente'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            {listing.regularPrice - listing.discountedPrice} € d'économie
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Chambres`
              : '1 Chambre'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Salles de bain`
              : '1 Salle de bain'}
          </li>
          <li>{listing.parking && 'Stationnement'}</li>
          <li>{listing.furnished && 'Meublé'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>

        {/* MAP */}

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contacter le propriétaire
          </Link>
        )}
      </div>
    </main>
  );
}

export default Listing;
