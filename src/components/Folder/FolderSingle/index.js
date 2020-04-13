import React from 'react';
import {bindActionCreators} from "redux";
import { get } from "../logic/folderActions";
import { connect } from "react-redux";
import StoryList from '../../Story/StoryList';
import Loader from '../../Loader';
import FolderListEmpty from "./FolderListEmpty";

class FolderSingle extends React.Component {
    state = {
        id: null
    };

    constructor(props) {
        super(props);

        this.state.id = parseInt(this.props.match.params.id);
    }

    componentDidMount() {
        this.props.get(this.state.id);
    }

    componentWillReceiveProps(nextProps) {
        let nextId = nextProps.match.params.id;
        if (nextId !== this.props.match.params.id) {
            this.props.get(nextId);
        }
    }

    render() {
        let folder = this.props.folders.single;

        return (
            this.props.folders.loading || !folder
                ? <Loader />
                : folder.stories.length
                    ? <StoryList stories={folder.stories} folder={folder}/>
                    : <FolderListEmpty />

        );
    }
}

const mapStateToProps = state => ({
    folders: state.folders
});

const mapDispatchToProps = dispatch => ({
    get: bindActionCreators(get, dispatch),
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(FolderSingle);