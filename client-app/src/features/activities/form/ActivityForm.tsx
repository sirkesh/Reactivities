import { observer } from "mobx-react-lite";
import React, {  useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Segment, Button, Header } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Activity } from "../../../app/models/activity";

const ActivityForm = () => {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity,
        loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
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

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The description title is required'),
        category: Yup.string().required(),
        date: Yup.string().required('The Date is Required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),

    })

    function handleFormSubmit(activity: Activity) {
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

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const { name, value } = event.target;
    //     setActivity({
    //         ...activity,
    //         [name]: value
    //     });
    // }

    if (loadingInitial) return <LoadingComponent content="Loading activity..." />

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit}>
                        {/* <FormField>
                            <Field placeholder="Title" name="title"></Field>
                            <ErrorMessage name="title"
                                render={error => <Label basic color="red" content={error} />} />
                        </FormField> */}
                        <MyTextInput name="title" placeholder="Title" />
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MySelectInput options={categoryOptions} placeholder="Category" name="category" />
                        <MyDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa" />
                        <Header content="Location Details" sub color="teal" />
                        <MyTextInput placeholder="City" name="city" />
                        <MyTextInput placeholder="Venue" name="venue" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            type="submit"
                            floated="right" positive content="Submit" />
                        <Button as={Link} to='/activities' floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>

        </Segment>
    );
}

export default observer(ActivityForm);