import { Link } from 'react-router-dom';

import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';

function Explore() {
  return (
    <div className='explore'>
      <header>
        <p className='pageHeader'>Trouvez le logement qu'il vous faut</p>
      </header>

      <main>
        {/* <Slider /> */}

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
          <Link to='/category/acheter'>
            <img
              src={sellCategoryImage}
              alt='vente'
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
