import React, { useEffect } from 'react';
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import PersonComponent from '../components/PersonComponent';
import {listPeople} from "../features/persons/personSlice";
import {AppDispatch, RootState} from "../store";
import {Person} from "../types/Person";


const PersonScreen = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { people } = useSelector((state: RootState) => state.persons);

    useEffect(() => {
        dispatch(listPeople());
    }, [dispatch]);

    return (
        <>
            <h3>Popular People</h3>
            <Row>
                {people.cast.map((person: Person) => (
                    <Col key={person.id} sm={12} md={4} lg={4} xl={3}>
                        <PersonComponent person={person} size="150px" />
                    </Col>
                ))}
            </Row>
        </>
    );
}
 
export default PersonScreen;