import React, { useEffect, useState, ChangeEvent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { listMovies, listMovieSearch } from '../features/movies/movieSlice';
import PaginationComponent from '../components/Pagination';
import Movies from '../components/Movies';
import { Movie } from '../types/Movie';

interface HomeScreenProps {
    movieRender: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ movieRender }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);

    const { movies, loading, error } = useSelector((state: RootState) => state.movies);

    const movieType = 'movie';

    useEffect(() => {
        dispatch(listMovies(movieRender));
    }, [dispatch, movieRender]);

    const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            dispatch(listMovieSearch({ movie: movieType, searchTerm, pageNumber: 1 }));
            setCurrentPage(1);
        }
    };

    const handleNextPage = (pageNumber: number) => {
        dispatch(listMovieSearch({ movie: movieType, searchTerm, pageNumber }));
        setCurrentPage(pageNumber);
    };

    const numberPages = Math.floor(1000 / 20); // TODO: Replace with real count later

    return (
        <>
            <div className="search-flex">
                <input
                    type="text"
                    name="search-term"
                    onChange={handleSearchInput}
                    id="search-term"
                    placeholder="Search for a movie..."
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">Error: {String(error)}</p>}

            {!loading && movies?.length === 0 && (
                <p>No movies found.</p>
            )}

            {!loading && movies?.length > 0 && (
                <>
                    {movies.length > 20 && (
                        <PaginationComponent
                            pagination={{
                                pages: numberPages,
                                total: movies.length,
                                nextPage: handleNextPage,
                                currentPage: currentPage,
                            }}
                        />
                    )}

                    <h2 className="mt-4 mb-3">Latest Movies</h2>

                    <Row>
                        {movies.map((movie: Movie) => (
                            <Col key={movie.id} sm={12} md={4} lg={4} xl={3}>
                                <Movies movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    );
};

export default HomeScreen;
