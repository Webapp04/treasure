import React from 'react';
import './style.scss'
import {FAQS_TEXT} from "../../constant/faqs";
import FAQsItem from "./FAQsItem";

const FAQsPage = () => {
    return (
        <div className='FAQsPage'>
            {FAQS_TEXT?.map((item, key) => <FAQsItem key={key} answer={item?.answer} question={item?.question}/>)}
        </div>
    );
};

export default FAQsPage;