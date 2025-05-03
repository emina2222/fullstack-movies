import React from 'react';
import {Card, CardImg, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {TVEpisode} from "../types/TVEpisode";

interface EpisodeProps {
    currentSeasonEpisode: TVEpisode
}

const CurrentSeason = ({ currentSeasonEpisode }: EpisodeProps): JSX.Element => {
    return (
        <Card className='rounded current-season'>
            <a href={`/movie/${currentSeasonEpisode.id}`}>
                <CardImg style={{height: '195px', width: '130px'}}
                         src={`https://image.tmdb.org/t/p/w500${currentSeasonEpisode.poster_path}`} variant='top'/>
            </a>
            <Card.Body>
                <Col>
                    <Link to={`/currentSesonEpisodes/${currentSeasonEpisode?.id}`}>
                        <Card.Title style={{color: 'black'}} as='div'>
                        </Card.Title>
                    </Link>
                </Col>

                <Card.Text style={{color: 'black'}} as='h2'>
                    <a href="#">{currentSeasonEpisode?.name}</a>
                </Card.Text>

                <Card.Text style={{color: 'black'}} as='h4'>
                    <p>{currentSeasonEpisode?.air_date?.substring(0, 4)} | {currentSeasonEpisode?.episodes?.length - 1}</p>
                </Card.Text>

                <Card.Text style={{color: 'black'}} as='div' className="season-overview">
                    <p>{currentSeasonEpisode?.overview}</p>
                </Card.Text>

            </Card.Body>
        </Card>

    );
}

export default CurrentSeason;