import React from 'react'
import { MAX_STARS } from '../constants'

const Rating = ({
    stars = 0
}) => {
    const starsCount = stars > 0 ? Math.floor(stars) : MAX_STARS;
    const starsClass = stars > 0 ? 'star-on' : 'star-off';
    const half = stars % 1;

    return (
        <div>
            {[...Array(starsCount)].map((value, index) => {
                return <span key={index} className={`star ${starsClass}`} />;
            })}
            { half > 0 &&
                <span className="star star-half" />
            }
        </div>
    );
}

export default Rating
