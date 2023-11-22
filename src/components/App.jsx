import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchPhotos } from 'Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';
import css from './App.module.css';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }
    async function handleFetch() {
      try {
        setIsLoading(true);
        const { hits, totalHits } = await fetchPhotos(query, page);

        setGallery(prevImg => [...prevImg, ...hits]);

        setTotalPages(Math.ceil(totalHits / 12));
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    handleFetch();
  }, [query, page]);

  const handleSubmit = ({ query }) => {
    setQuery(query);
    setPage(1);
    setGallery([]);
    setTotalPages(null);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={css.appContainer}>
      <Searchbar onSubmit={handleSubmit}></Searchbar>

      {error && (
        <p className={css.message}>
          Oops, something went wrong, please try again later.
        </p>
      )}
      {gallery.length !== 0 && <ImageGallery gallery={gallery}></ImageGallery>}
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          color="#303f9f"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      )}
      {gallery.length !== 0 &&
        (page < totalPages ? (
          <Button onClick={handleLoadMore} btnName="Load more"></Button>
        ) : (
          <p className={css.message}>
            We're sorry, but you've reached the end of search results.
          </p>
        ))}
    </div>
  );
};
