import React from 'react';
import {Card, CardImg} from 'react-bootstrap'
import {Recommendation} from "../types/Recommendation";

interface RecommendationProps {
    recommendation: Recommendation
}

const RecommendationComponent = ({recommendation}: RecommendationProps) => {

    console.log(recommendation)

    return (
        <Card className='my-3 rounded'>
            <a href={`/movie/${recommendation.id}`}>
                <CardImg src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`} variant='top'/>
            </a>

            <Card.Body>
                <Card.Text style={{color: 'black'}} as='p'>

                    <a href="#">{recommendation?.title}</a>

                    <Card.Text style={{color: 'grey'}} as='span'>
                        {Math.round(recommendation.vote_average * 10)} %
                    </Card.Text>
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RecommendationComponent;