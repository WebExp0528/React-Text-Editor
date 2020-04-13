import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import shortcuts from './shortcuts.svg';
import shortcutsWin from './shortcuts_win.svg';
import {getOS} from "../../../services/os";

const ShortcutsModal = (props) => {
    const os = getOS();

    return (
        <div className="sho-shortcuts" hidden={!props.show}>
            <div className="sho-shortcuts__body">
                <button onClick={props.onHide} className="sho-shortcuts__close"><span className="icon icon--close"></span></button>
                <div className="sho-shortcuts__img-wrap">
                    {
                        os === 'Mac OS' || os === 'iOS'
                            ? <img src={shortcuts} alt="Shosho" />
                            : <img src={shortcutsWin} alt="Shosho" />
                    }
                </div>
            </div>
        </div>
    );
};

ShortcutsModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
};

export default ShortcutsModal;
