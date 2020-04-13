import React, { useState, useEffect } from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import { update } from "../../../Story/logic/storyActions";
import {bindActionCreators} from "redux";
import {Modal, Button, Form} from 'react-bootstrap';
import NameField from '../../../Folder/Form/NameField';
import FolderSchema from "../../../Folder/FolderSchema";
import {Formik} from "formik";
import { withRouter } from 'react-router-dom';
import './index.scss';

const CreateFolder = (props) => {
    const [ story, setStory ] = useState(null);
    const handleCancel = () => {
        props.hide();
    };

    useEffect(() => {
        if (props.story) {
            setStory(props.story);
        }
    }, [props.story]);

    return (
        <Modal className="sho-modal" show={props.moveStoryCreateFolderModal.show} onHide={handleCancel}>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={FolderSchema}
                onSubmit={(values, { setSubmitting }) => {
                    props.updateStory({
                        ...story,
                        folder: {
                            ...values
                        }
                    });

                    setSubmitting(false);

                    props.hide();
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting
                  }) => (
                    <Form
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Modal.Header>
                            <Modal.Title>Name Your Folder</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NameField
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                isInvalid={errors.name && touched.name}
                                errors={errors.name}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="outline-secondary" onClick={handleCancel}>
                                Cancel
                            </Button>
                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                Create
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
}


const mapStateToProps = state => ({
    moveStoryCreateFolderModal: state.moveStoryCreateFolderModal
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    updateStory: bindActionCreators(update, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateFolder));