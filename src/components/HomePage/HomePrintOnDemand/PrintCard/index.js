import React from 'react';

const PrintCard = ({title, text, id}) => {
    return (
        <div className={`printCard ${title === 'Enjoy' && 'printCard__bigShadow'} `}>
            <p className='printCard__title'>{title}</p>
            <p className='printCard__text'>{text}</p>
        </div>
    );
};

export default PrintCard;