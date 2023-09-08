import './style.scss';

import useCommon from '../../../hooks/useCommon';

const VoteProgress = ({type, goalCount, currentCount, onVote}) => {

    const { americanFormatNumber } = useCommon();

    return (
        <div className="voteProgress">
            <div className="voteProgress__countRow">
                <div className="voteProgress__countRow--type">
                    {type}
                </div>
                <div className="voteProgress__countRow--counter">
                    {americanFormatNumber(currentCount, 0)} / {americanFormatNumber(goalCount, 0)}
                </div>
            </div>
            <div className="voteProgress__bar">
                <div
                    className={`voteProgress__bar--line ${type}`}
                    style={{width: `${100/(goalCount/currentCount)}%`}}
                />
            </div>
        </div>
    );
}

export default VoteProgress;
