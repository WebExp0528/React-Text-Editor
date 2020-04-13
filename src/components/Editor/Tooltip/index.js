import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import useClickOutside from '../../../hooks/clickOutside';

const Tooltip = ({ variant, children, show }) => {
    const ref = useRef(null);
    const tipRef = useRef(null);
    const hideTooltip = () => {
        if (ref && ref.current && ref.current.classList.contains('show')) {
            ref.current.classList.remove('show');
        }
    };

    useClickOutside(ref, hideTooltip);

    useEffect(() => {
        const observer = new MutationObserver(e => {
            e = e[0];
            if (e.target && e.target.classList.contains('show')) {
                const scrollElement = document.getElementById('editor-scroll-container');

                e.target.dataset.initialScroll = scrollElement.scrollTop;
            }
        });

        observer.observe(ref.current, {
          attributes: true, 
          attributeFilter: ['class'],
          childList: false, 
          characterData: false
        });

        return () => observer.disconnect();

    }, [ref]);

    useEffect(() => {
        const scrollElement = document.getElementById('editor-scroll-container');
        const scrollHandler = (e) => {
            if (ref && ref.current && tipRef && tipRef.current && ref.current.classList.contains('show')) {
                const tipHeight = 14;
                let top = parseInt(ref.current.dataset.initial) - (e.target.scrollTop - parseInt(ref.current.dataset.initialScroll));
                tipRef.current.style.top = (top - tipHeight / 2) + 'px';
                ref.current.style.top = top + 'px';
            }
        };

        if (scrollElement !== null) {
            scrollElement.addEventListener('scroll', scrollHandler);
        }

        window.addEventListener('scroll', scrollHandler);

        return () => {
            const scrollElement = document.getElementById('codex-editor');

            if (scrollElement !== null) {
                scrollElement.removeEventListener('scroll', scrollHandler);
            }

            window.removeEventListener('scroll', scrollHandler);
        };
    }, [ref]);

    return (
        <div ref={ref} style={{display: !show ? 'none' : ''}} className={`c-tooltip ${variant ? `${variant}-tooltip` : ''}`}>
            <div className={`c-tooltip-content ${variant ? `${variant}-content` : ''}`}>
                {children}
                <span ref={tipRef} className="c-tooltip__tip"></span>
            </div>
        </div>
    );
};

Tooltip.defaultProps = {
    show: true
};

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.string,
    show: PropTypes.bool
};

export default Tooltip;
