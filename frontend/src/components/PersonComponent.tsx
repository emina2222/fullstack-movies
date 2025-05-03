import React from 'react';
import { Card } from 'react-bootstrap';
import {Person} from "../types/Person";

interface PersonProps {
    person: Person;
    size: string | number; // string like '100 px' or number like 100
}

const PersonComponent: React.FC<PersonProps> = ({ person, size }) => {
    return (
        <Card className="my-3 p-3 rounded">
            <a href={`/api/people/${person.id}`}>
                <Card.Img
                    style={{ width: typeof size === 'number' ? `${size}px` : size }}
                    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                    variant="top"
                />
            </a>

            <Card.Body>
                <a href={`/api/people/${person.id}`}>
                    <Card.Title as="div">
                        <strong>{person.title || person.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <div style={{ color: 'black' }}>{person.name}</div>
                    {person.character && <div style={{ color: 'grey' }}>{person.character}</div>}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default PersonComponent;
