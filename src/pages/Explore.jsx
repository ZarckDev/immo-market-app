import { Link } from 'react-router-dom';

import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

import Slider from '../components/Slider';

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Trouvez le logement qu'il vous faut</p>
      </header>

      <main>
        {/* <Slider /> */}
        <Slider />

        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/louer'>
            <img
              src={rentCategoryImage}
              alt='louer'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Location</p>
          </Link>
          <Link to='/category/vendre'>
            <img
              src={sellCategoryImage}
              alt='vendre'
              className='exploreCategoryImg'
            />
            <p className='exploreCategoryName'>Achat</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Explore;
