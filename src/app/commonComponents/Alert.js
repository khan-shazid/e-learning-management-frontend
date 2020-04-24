import React, { Component } from 'react';

export const Alert = ({data}) => {
  return(
    <div className={`alert alert-${data.type}`} role="alert">
      {data.message}
    </div>
  )
}
