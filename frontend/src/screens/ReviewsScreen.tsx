import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Col, CardImg, Row} from 'react-bootstrap'
import 'react-circular-progressbar/dist/styles.css';
import {useDispatch, useSelector} from 'react-redux';
import Reviews from '../components/Reviews'
import {AppDispatch, RootState} from "../store";
import {listMovieDetails} from "../features/movies/movieSlice";
import {listTopBilledActors} from "../features/persons/personSlice";
import {fetchReviews} from "../features/movies/reviewSlice";


const ReviewsScreen = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const movieDetails = useSelector((state: RootState) => state.movies)
    const {movie} = movieDetails

    const movieReviewsList = useSelector((state: RootState) => state.reviews)
    const {movieReviews} = movieReviewsList

    console.log(movieReviews)

    useEffect(() => {
        if(id){
            dispatch(listMovieDetails(id))
            dispatch(listTopBilledActors(id))
            dispatch(fetchReviews({ movieId: id, type: 'movie' }));
        }
    }, [dispatch, id])

    return (
        <>
            <div className='div-set'>
                <CardImg style={{height: '87px', width: '58px'}}
                         src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} variant='top'/>

                {movie.title} {movie.release_date}
                <p></p>
                <Link className='my-3' to='/'>Go Back</Link>
            </div>
            <Row className="row-border-top circle-image">
                <div>
                    {movieReviews.map((review, index) =>
                        (index < 4) ?
                            <Col key={review.id} sm={12}>
                                <Reviews review={review}/>
                            </Col>
                            : null
                    )}
                </div>
            </Row>
        </>
    );
}

export default ReviewsScreen;