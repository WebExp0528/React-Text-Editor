import React from 'react';
import {connect} from "react-redux";
import { hide } from "./logic/modalActions";
import { update } from "../logic/folderActions";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {Modal, Button, Form} from 'react-bootstrap';
import NameField from '../Form/NameField';
import FolderSchema from "../FolderSchema";
import {Formik} from "formik";

class UpdateFolder extends React.Component {
    handleCancel = () => {
        this.props.hide();
    };

    render() {
        return (
            <Modal className="sho-modal" show={this.props.updateFolderModal.show} onHide={this.handleCancel}>
                {
                    this.props.updateFolderModal.folder &&
                    <Formik
                        initialValues={{
                            id: this.props.updateFolderModal.folder.id,
                            name: this.props.updateFolderModal.folder.name
                        }}
                        validationSchema={FolderSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            this.props.updateFolder(values);

                            setSubmitting(false);

                            this.props.hide();
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
                                    <Modal.Title>Edit Folder</Modal.Title>
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
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Form>
                        )}
                    </Formik>
                }
            </Modal>
        );
    }
}

UpdateFolder.propTypes = {
    hide: PropTypes.func,
    updateFolder: PropTypes.func,
    updateFolderModal: PropTypes.shape({
        show: PropTypes.bool
    })
};

UpdateFolder.defaultProps = {
    updateFolderModal: {
        show: false
    }
};

const mapStateToProps = state => ({
    updateFolderModal: state.updateFolderModal
});

const mapDispatchToProps = dispatch => ({
    hide: bindActionCreators(hide, dispatch),
    updateFolder: bindActionCreators(update, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFolder);