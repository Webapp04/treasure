import {useState, useRef} from 'react';
import AirdropApi from '../../../api/AirdropApi';
import 'react-toastify/dist/ReactToastify.css';
import '../style.scss';
import {VALIDATE_EMAIL} from "../../../constant/reg";
import useHandleToastAlert from "../../../hooks/alert/useHandleToastAlert";

export default function HomeNotWhitelisted() {
    const emailRef = useRef(null);

    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleToastAlert = useHandleToastAlert();

    const onValidateEmail = (event) => setIsEmailValid(VALIDATE_EMAIL.test(event?.target?.value));

    const onSendEmail = async () => {
        if (!isEmailValid) return;

        new AirdropApi().sendEmail(emailRef?.current?.value);
        handleToastAlert.success('Email sent successfully');
        emailRef.current.value = '';
    }

    return (
        <div className="homePage__info">
            <div className="homePage__info-title">Not in Whitelist yet?</div>
            <div className="homePage__info-subtitle">Please, enter your email so we invite you.</div>
            <div className="homePage__info-input">
                <input type="email" placeholder="Enter your email" ref={emailRef} onInput={onValidateEmail}/>
                <button onClick={onSendEmail} className={`${!isEmailValid ? 'invalid' : ''}`}>
                    <div className="homePage__info-button-icon"/>
                </button>
            </div>
        </div>
    );
}
