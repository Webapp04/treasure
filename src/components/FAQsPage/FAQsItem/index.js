import React, {useState} from 'react';

const FAQsItem = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false)
    const onToggleAnswer = () => setIsOpen(!isOpen)

    return (
        <div className={`FAQsItem ${isOpen && 'FAQsItem__open'}`} onClick={onToggleAnswer}>
            <div className='FAQsItem__question'>
                <p>{question}</p>
                <div className={`FAQsItem__arrow ${isOpen && 'FAQsItem__arrow--open'}`}/>
            </div>

            <div className={`FAQsItem__answer ${isOpen && 'FAQsItem__answer--open'}`}>{answer}</div>
        </div>
    );
};

export default FAQsItem;