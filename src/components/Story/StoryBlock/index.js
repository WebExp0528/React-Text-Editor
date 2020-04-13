import React from 'react';
import {bindActionCreators} from "redux";
import { getAll } from "../logic/storyActions";
import {connect} from "react-redux";
import StoryList from '../StoryList';
import Loader from '../../Loader';
import usePrefetchData from "../../../hooks/prefetchData";
import StoryListEmpty from '../StoryListEmpty';

const StoryBlock = ({ getAll, ...props}) => {
    const { data, loading } = props.stories;

    usePrefetchData(data, getAll, loading);

    return (
        loading
            ? <Loader loading={true} />
            : data && data.length
                ? <StoryList stories={data}/>
                : <StoryListEmpty/>
    );
};

const mapStateToProps = state => ({
    stories: state.stories
});

const mapDispatchToProps = dispatch => ({
    getAll: bindActionCreators(getAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryBlock);
