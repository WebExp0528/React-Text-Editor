import React from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import { create } from "../logic/folderActions";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {Modal, Button, Form} from 'react-bootstrap';
import NameField from '../Form/NameField';
import FolderSchema from "../FolderSchema";
import {Formik} from "formik";
import { withRouter } from 'react-router-dom';
import './index.scss';

class CreateFolder extends React.Component {
    handleCancel = () => {
        this.props.hide();
    };

    render() {
        return (
            <Modal className="sho-modal" show={this.props.createFolderModal.show} onHide={this.handleCancel}>
                <Formik
                    initialValues={{
                        name: ''
                    }}
                    validationSchema={FolderSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        this.props.createFolder(values);

                        setSubmitting(false);

                        this.props.hide();

                        this.props.history.push('/folders');
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
                                <Button variant="outline-secondary" onClick={this.handleCancel}>
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
}

CreateFolder.propTypes = {
    hide: PropTypes.func,
    createFolder: PropTypes.func,
    createFolderModal: PropTypes.shape({
        show: PropTypes.bool
    })
};

CreateFolder.defaultProps = {
    createFolderModal: {
        show: false
    }
};

const mapStateToProps = state => ({
    createFolderModal: state.createFolderModal
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    createFolder: bindActionCreators(create, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateFolder));