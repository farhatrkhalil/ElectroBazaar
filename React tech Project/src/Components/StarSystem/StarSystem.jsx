import './StarSystem.css';

function StarSystem({ rating }) {
  const renderStars = () => {
    const stars = [];
    const maxStars = 5;

    const integerRating = Math.floor(rating);
    const fractionalRating = rating - integerRating;

    const getStarColor = (starIndex) => {
      if (rating >= starIndex) {
        if (rating >= 100) {
          return 'gold';
        } else if (rating >= 50) {
          return 'silver';
        } else {
          return 'bronze';
        }
      } else {
        return '';
      }
    };

    for (let i = 1; i <= maxStars; i++) {
      let starColor = getStarColor(i);

      if (i <= integerRating) {
        starColor = 'gold';
      } else if (i === integerRating + 1 && fractionalRating > 0 && fractionalRating <= 0.5) {
        const percentageFilled = fractionalRating * 100;
        stars.push(
          <svg key={i} className={`star`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`star-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset={`${percentageFilled}%`} style={{ stopColor: 'gold' }} />
                <stop offset={`${percentageFilled}%`} style={{ stopColor: 'black' }} />
              </linearGradient>
            </defs>
            <path fill={`url(#star-gradient-${i})`} d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        );
      } else {
        starColor = '';
      }

      if (i <= maxStars) {
        stars.push(
          <svg key={i} className={`star ${starColor}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        );
      }
    }

    return stars;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {renderStars()}
      <p style={{ marginLeft: "5px" }}>({rating})</p>
    </div>
  );
}

export default StarSystem;
