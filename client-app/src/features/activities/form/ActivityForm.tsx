import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Form, Segment, Button } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";

const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        //activity! with exclamation mark is non-null assertion or bang
        /*https://github.com/Microsoft/TypeScript/wiki/What's-new-in-TypeScript#non-null-assertion-operator
         It is a way to tell the compiler "this expression cannot be null or undefined here, 
         so don't complain about the possibility of it being null or undefined."
          Sometimes the type checker is unable to make that determination itself
          */
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    function handleSubmit() {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => {
                history.push(`/activities/${newActivity.id}`);
            });
        } else {
            updateActivity(activity).then(() => {
                history.push(`/activities/${activity.id}`);
            });
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({
            ...activity,
            [name]: value
        });
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input placeholder="Title" value={activity.title} name="title" onChange={handleInputChange}></Form.Input>
                <Form.TextArea placeholder="Description" value={activity.description} name="description" onChange={handleInputChange}></Form.TextArea>
                <Form.Input placeholder="Category" value={activity.category} name="category" onChange={handleInputChange}></Form.Input>
                <Form.Input type="date" placeholder="Date" value={activity.date} name="date" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="City" value={activity.city} name="city" onChange={handleInputChange}></Form.Input>
                <Form.Input placeholder="Venue" value={activity.venue} name="venue" onChange={handleInputChange}></Form.Input>
                <Button loading={loading} type="submit" floated="right" positive content="Submit" />
                <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
}

export default observer(ActivityForm);