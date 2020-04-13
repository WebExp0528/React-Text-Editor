import React from 'react';
import {bindActionCreators} from "redux";
import { getAll } from "../logic/folderActions";
import {connect} from "react-redux";
import FolderList from '../FolderList';
import FolderListEmpty from '../FolderListEmpty';
import Loader from '../../Loader';
import usePrefetchData from "../../../hooks/prefetchData";

const FolderBlock = ({ getAll, ...props}) => {
    const { data, loading } = props.folders;

    usePrefetchData(data, getAll, loading);

    return (
        loading
            ? <Loader />
            : data && data.length
                ? <FolderList folders={data}/>
                : <FolderListEmpty />

    );
};

const mapStateToProps = state => ({
    folders: state.folders
});

const mapDispatchToProps = dispatch => ({
    getAll: bindActionCreators(getAll, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderBlock);