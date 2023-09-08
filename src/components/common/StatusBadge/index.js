import './style.scss';

const StatusBadge = ({status}) => {

    return (
        <div className={`statusBadge ${status}`}>
            {status}
        </div>
    );
}

export default StatusBadge;
