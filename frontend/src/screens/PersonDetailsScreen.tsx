import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Button, ListGroupItem} from 'react-bootstrap'
import 'react-circular-progressbar/dist/styles.css';
import {useDispatch, useSelector} from 'react-redux';
import ShowMoreText from "react-show-more-text";
import MoviesPerson from '../components/MoviesPerson';
import {listPersonDetails, savePersonDetails} from "../features/persons/personSlice";
import {listMovieCredits} from "../features/movies/movieSlice";
import {AppDispatch, RootState} from "../store";
import {Movie} from "../types/Movie";


const PersonDetailsScreen = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<{ id: string }>();

    const { person } = useSelector((state: RootState) => state.persons);
    const { movieCreditsObj } = useSelector((state: RootState) => state.movies);

    useEffect(() => {
        if (id) {
            dispatch(listPersonDetails(id));
            dispatch(listMovieCredits(id));
        }
    }, [dispatch, id]);

    const tempPerson = {
        adult: person?.adult,
        alsoKnownAs: person?.also_known_as,
        biography: person?.biography,
        birthDay: person?.birthday,
        deathDay: person?.deathDay || '',
        gender: person?.gender,
        homepage: person?.homepage,
        theMovieDbId: person?.id,
        imdbId: person?.imdb_id,
        knownForDepartment: person?.known_for_department,
        name: person?.name,
        placeOfBirth: person?.place_of_birth,
        popularity: person?.popularity,
        profilePath: person?.profile_path,
    };

    const savePeople = () => {
        dispatch(savePersonDetails(tempPerson));
    };

    const splitYear = (date: string): number | string => {
        if (!date) return '------';
        return new Date(date).getFullYear();
    };

    return (
        <div>
            <Link className="btn btn-dark my-3" to="/">
                Go Back
            </Link>

            <Row>
                <Col md={3}>
                    <Image src={`https://image.tmdb.org/t/p/w300${person?.profile_path}`} fluid />
                    <ListGroup>
                        <div className="text-dark p-3">
                            <h4>Personal Info</h4>
                            <p><strong>Known For:</strong> {person?.known_for_department}</p>
                            <p><strong>Known Credits:</strong> {movieCreditsObj?.length ?? 0}</p>
                            <p><strong>Gender:</strong> {person?.gender === 2 ? 'Male' : 'Female'}</p>
                            <p><strong>Birthday:</strong> {person?.birthday}</p>
                            <p><strong>Place of Birth:</strong> {person?.place_of_birth}</p>
                            <p><strong>Also Known As:</strong> {person?.also_known_as?.join(', ')}</p>

                            <Button variant="info" onClick={savePeople}>Login to Edit</Button>
                        </div>
                    </ListGroup>
                </Col>

                <Col md={9}>
                    <div className="text-dark">
                        <h2>{person?.name}</h2>
                        <h3>Biography</h3>
                        <ShowMoreText
                            lines={5}
                            more="Show more"
                            less="Show less"
                            className="content-css"
                            anchorClass="show-more-less-clickable"
                            expanded={false}
                            width={880}
                        >
                            <p>{person?.biography}</p>
                        </ShowMoreText>

                        <h3 className="pt-4">Known For</h3>
                        <Row>
                            {movieCreditsObj?.slice(0, 6).map((movie: Movie) => (
                                <Col key={movie.id} style={{ width: '16%' }}>
                                    <MoviesPerson movie={movie}/>
                                </Col>
                            ))}
                        </Row>

                        <h3 className="pt-4">Acting</h3>
                        <ListGroup>
                            {movieCreditsObj?.map((movie: Movie) => (
                                <ListGroupItem key={movie.id}>
                                    <ul className="style-ul-person">
                                        <li className="style-li-person">{splitYear(movie.release_date)}</li>
                                        <li className="style-li-person">
                                            <input type="radio" name="movie" value="movie" readOnly />
                                        </li>
                                        <li className="style-li-person">{movie.title}</li>
                                    </ul>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default PersonDetailsScreen;
