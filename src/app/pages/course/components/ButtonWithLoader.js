import React from 'react';
import Loader from '../../../commonComponents/Loader';

export const ButtonWithLoader = ({title,loader,buttonStyle,loaderStyle,dimen,onClick}) =>( //editable row
  <button className={`btn btn-${buttonStyle}`} onClick={onClick} disabled={loader}>
    <Loader
      visible={loader}
      type={loaderStyle}
      height={dimen}
      width={dimen}
      />{title}
  </button>
)
