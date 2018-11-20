import React from 'react';

import ProfileImageDefault from './icons/profile-image-default';

interface IProps {
  imgSrc?: string | null;
  imgSize?: string | number;
  imgWidth?: string | number;
  imgHeight?: string | number;
}

const UserImage: React.SFC<IProps> = (props) => {

  const {
    imgSrc,
    imgSize,
    imgWidth,
    imgHeight,
  } = props;

  const width = imgWidth || imgSize || 40;
  const height = imgHeight || imgSize || 40;

  return (
    imgSrc ? (
      <img src={imgSrc} height={height} width={width} />
    ) : (
      <ProfileImageDefault height={height} width={width} />
    )
  );
};

export default UserImage;
