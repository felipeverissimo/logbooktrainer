import React, { useState } from 'react';
import styles from './components.module.css'

const TextAreaComponent = ({ text, onUpdate, onClear }) => {
    const [currentText, setCurrentText] = useState(text);

    const handleTextChange = (event) => {
        setCurrentText(event.target.value);
        onUpdate(event.target.value);
    };

    const handleClear = () => {
        setCurrentText('');
        // onClear(); 
    };

    return (
        <div className={styles.dFlex}>
            <button  className={styles.removerButton} onClick={handleClear}>
            <svg fill="#C9A86C" width="20" height="20" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
                    <path d="M215.99609,52h-176a4,4,0,0,0,0,8h12V208a12.01375,12.01375,0,0,0,12,12h128a12.01375,12.01375,0,0,0,12-12V60h12a4,4,0,0,0,0-8Zm-20,156a4.00458,4.00458,0,0,1-4,4h-128a4.00458,4.00458,0,0,1-4-4V60h136ZM84,24a4.0002,4.0002,0,0,1,4-4h80a4,4,0,0,1,0,8H88A4.0002,4.0002,0,0,1,84,24Z"/>
                </svg>
            </button>
            <textarea value={currentText} onChange={handleTextChange} />
        </div>
    );
};

export default TextAreaComponent;
