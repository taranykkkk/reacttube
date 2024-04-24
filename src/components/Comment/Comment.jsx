import moment from 'moment';
import styles from './Comment.module.scss';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { converterValue } from '../../utils/ConverterValue';
import React, { useEffect, useRef, useState } from 'react';
import test from '../../assets/react.svg';

function Comment({ commentData }) {
  const [showButton, setShowButton] = useState(
    Array(commentData.data.length).fill(false),
  );
  const myRefs = useRef([]);
  const [isActiveCB, setIsActiveCB] = useState(false);

  const handleRef = (el, i) => {
    return (myRefs.current[i] = el);
  };

  useEffect(() => {
    commentData.data.forEach((text, index) => {
      if (myRefs.current[index]) {
        const lineHeight = parseInt(
          window.getComputedStyle(myRefs.current[index]).lineHeight,
        );
        const elementHeight = myRefs.current[index].clientHeight;

        const lineCount = Math.round(elementHeight / lineHeight);

        if (lineCount > 4) {
          const showButtonCopy = [...showButton];

          showButtonCopy[index] = true;
          setShowButton(showButtonCopy);
        }
      }
    });
  }, [commentData.data, myRefs]);

  const handleViewMore = (e) => {
    const parentElem = e.target.closest('div').children;
    Array.from(parentElem).forEach((el) => {
      if (el.tagName === 'P') {
        el.classList.toggle(styles.showComment);
        setIsActiveCB(!isActiveCB);
      }
    });
  };
  return (
    <>
      {commentData.data.map((items, i) => (
        <div className={styles.comment} key={i}>
          <img
            src={items.snippet.topLevelComment.snippet.authorProfileImageUrl}
            onError={(e) => (e.target.src = test)}
          />
          <div>
            <h3>
              {items.snippet.topLevelComment.snippet.authorDisplayName}{' '}
              <span>
                {moment(
                  items.snippet.topLevelComment.snippet.publishedAt,
                ).fromNow()}
              </span>
            </h3>
            <p
              ref={(el) => handleRef(el, i)}
              className={showButton[i] ? styles.showComment : ''}>
              {items.snippet.topLevelComment.snippet.textOriginal}
            </p>
            {showButton[i] && (
              <button
                onClick={(e) => handleViewMore(e)}
                className={styles.showCommentButton}>
                {isActiveCB ? 'Hidden' : 'Read more'}
              </button>
            )}
            <div className={styles.comment_action}>
              <ThumbsUp size={20} color="#5a5a5a" />{' '}
              <span>
                {items.snippet.topLevelComment.snippet.likeCount === 0
                  ? ''
                  : converterValue(
                      items.snippet.topLevelComment.snippet.likeCount,
                    )}
              </span>
              <ThumbsDown size={20} color="#5a5a5a" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Comment;
