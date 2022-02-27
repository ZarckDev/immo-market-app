import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// import required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

//firebase
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';

// firestore
import { getDoc, doc } from 'firebase/firestore';

// component
import Spinner from '../components/Spinner';

import shareIcon from '../assets/svg/shareIcon.svg';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url) => (
          <SwiperSlide key={url}>
            <div
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

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
        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={[listing.geolocation.lat, listing.geolocation.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            <Marker
              position={[listing.geolocation.lat, listing.geolocation.lng]}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

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

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat
