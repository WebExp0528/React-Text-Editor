import React, { useState, useEffect } from 'react';
import { update } from '../../Story/logic/storyActions';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TextareaAutosize from 'react-autosize-textarea';

const TitleInput = props => {
    const [ story, setStory ] = useState(null);

    useEffect(() => {
        if (props.stories.single) {
            setStory(props.stories.single);
        }
    }, [props.stories.single]);

    const handleTitleBlur = () => {
        if (story.title) {
            props.update({
                ...story,
                title: story.title
            });
        }
    };

    const handleTitleChange = (e) => {
        document.title = `Shosho - ${e.target.value}`;

        setStory({
            ...story,
            title: e.target.value
        });
    };

    return (
        <TextareaAutosize
            placeholder="Your story title"
            type="text"
            className="editor-form__header"
            value={story ? story.title : ''}
            onBlur={handleTitleBlur}
            onChange={handleTitleChange}
            spellCheck={false}
            onKeyPress={props.onKeyPress}
        />
    );
};

const mapStateToProps = state => ({
    stories: state.stories
});

const mapDispatchToProps = dispatch => ({
    update: bindActionCreators(update, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(TitleInput);
