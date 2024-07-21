import React, { useState, useEffect } from 'react';
import {faAnglesUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleClickBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button className={`btn btn-primary back-to-top ${isVisible ? 'visible' : ''}`} onClick={handleClickBackToTop}>
            <FontAwesomeIcon icon={faAnglesUp} />
        </button>
    );
};

export default BackToTopButton;
