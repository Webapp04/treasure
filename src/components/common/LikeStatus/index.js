import './style.scss';

import likeIcon from '../../../assets/images/like.svg';
import dislikeIcon from '../../../assets/images/dislike.svg';
import useCommon from '../../../hooks/useCommon';

const LikeStatus = ({count, status}) => {

    const { americanFormatNumber } = useCommon()
    return (
        <div className="likeStatus">
            <span>{americanFormatNumber(count, 0)}</span>
            <img src={status === 'like' ? likeIcon : dislikeIcon} alt="" />
        </div>
    );
}

export default LikeStatus;
