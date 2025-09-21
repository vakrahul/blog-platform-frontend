import { Link } from 'react-router-dom';

const Paginate = ({ pages, page }) => {
  return (
    pages > 1 && (
      <div className='pagination'>
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={`/page/${x + 1}`}
            className={x + 1 === page ? 'active' : ''}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;