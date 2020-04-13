import React, { useState, useEffect } from 'react';
import './index.scss';
import CreateFolderModal from '../Folder/CreateFolder';
import PropTypes from "prop-types";
import { show } from "../Folder/CreateFolder/logic/modalActions";
import { create } from "../Story/logic/storyActions";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';

const Aside = (props) => {
    const [ loading, setLoading ] = useState(false);
    const handleFolderClick = () => {
        props.show();
    };

    const handleStoryClick = () => {
        setLoading(true);
        props.create({
            title: '',
            text: JSON.stringify({
                    "time": Date.now(),
                    "blocks":[
                    ]
                }
            )
        });
    };

    useEffect(() => {
        if (props.stories.success && loading) {
            props.history.push('/stories/' + props.stories.data[0]['id']);
            setLoading(false);
        }
    }, [props.stories.success, loading]); //eslint-disable-line

    return (
        <>
            <aside className="aside">
                <div className="aside-btns">
                    <button
                        className="btn btn-outline-success aside-btn"
                        onClick={handleStoryClick}
                        disabled={props.stories.loading || loading}
                    >New Story</button>
                    <button
                        className="btn btn-outline-secondary aside-btn"
                        onClick={handleFolderClick}
                    >New Folder</button>
                </div>
            </aside>

            <CreateFolderModal/>
        </>
    )
};

Aside.propTypes = {
    show: PropTypes.func,
    createFolderModal: PropTypes.shape({
        show: PropTypes.bool
    })
};

Aside.defaultProps = {
    createFolderModal: {
        show: false
    }
};

const mapStateToProps = state => ({
    createFolderModal: state.createFolderModal,
    stories: state.stories,
});

const mapDispatchToProps = dispatch => ({
    show: bindActionCreators(show, dispatch),
    create: bindActionCreators(create, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Aside));
