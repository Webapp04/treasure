import React from 'react';
import './style.scss'
import GetItem from "./GetItem";
import {GET_WITH_KEY} from "../../../constant/home";

const HomeWithKeyGet = () => {
    return (
        <div className='homeWithKeyGet'>
            <p className='homeWithKeyGet__title'>With the Key you get !</p>
            <div className='homeWithKeyGet__list'>
                {GET_WITH_KEY?.map((item, key) => <GetItem key={key} text={item}/>)}
            </div>
        </div>
    );
};

export default HomeWithKeyGet;