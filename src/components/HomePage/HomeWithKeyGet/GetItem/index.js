import React from 'react';
import key from '../../../../assets/images/key_yellow.svg'

const GetItem = ({text}) => {
    return (
        <div className='getItem'>
            <img src={key} alt={''}/>
            <p>{text}</p>
        </div>
    );
};

export default GetItem;