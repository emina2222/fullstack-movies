import React, { useEffect, useState, ChangeEvent } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTvList, searchTvShows } from '../features/tv/tvSlice';
import Pagination from '../components/Pagination';
import TVComponent from '../components/TVComponent';
import { TV } from '../types/TV';

interface HomeTVScreenProps {
    tvRender: string;
}

const HomeTVScreen: React.FC<HomeTVScreenProps> = ({ tvRender }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { tvs, searchedTvs } = useSelector((state: RootState) => state.tv);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalResults, setTotalResults] = useState<number>(0);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const tvType = 'tv';
    const resultsToRender = isSearching ? searchedTvs : tvs;
    const numberPages = Math.floor(totalResults / 20);

    useEffect(() => {
        dispatch(fetchTvList(tvRender));
    }, [dispatch, tvRender]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = async () => {
        if (searchTerm.trim()) {
            setIsSearching(true);
            setCurrentPage(1);
            const resultAction = await dispatch(searchTvShows({ mediaType: tvType, query: searchTerm, page: 1 }));
            if (searchTvShows.fulfilled.match(resultAction)) {
                setTotalResults(resultAction.payload.length * 20); // Adjust based on real backend response
            }
        }
    };

    const handleNextPage = async (pageNumber: number) => {
        setCurrentPage(pageNumber);
        if (isSearching) {
            await dispatch(searchTvShows({ mediaType: tvType, query: searchTerm, page: pageNumber }));
        }
    };

    return (
        <>
            <div className="search-flex">
                <input
                    type="text"
                    name="search-term"
                    id="search-term"
                    placeholder="Search for a show..."
                    onChange={handleChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="btn" onClick={handleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </button>
            </div>

            {totalResults > 20 && (
                <Pagination
                    pagination={{
                        pages: numberPages,
                        total: totalResults,
                        currentPage: currentPage,
                        nextPage: handleNextPage
                    }}
                />
            )}

            <h2 className="mt-4 mb-3">Latest TV Shows</h2>

            <Row>
                {resultsToRender.length > 0 &&
                    resultsToRender.map((tv: TV) => (
                        <Col key={tv.id} sm={12} md={4} lg={4} xl={3}>
                            <TVComponent tv={tv} />
                        </Col>
                    ))}
            </Row>
        </>
    );
};

export default HomeTVScreen;
