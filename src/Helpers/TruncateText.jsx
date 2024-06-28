import React from 'react';

const TruncateText = ({ text, maxLength }) => {
  if (text.length <= maxLength) {
    return <p>{text}</p>;
  }
  const truncated = text.substring(0, maxLength) + '...';
  return <p>{truncated}</p>;
};

export default TruncateText;
