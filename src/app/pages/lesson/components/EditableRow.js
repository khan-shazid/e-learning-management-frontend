import React from 'react';

export const EditableRow = ({title,name,flag,value,type,onChange}) =>( //editable row
  <tr>
      <th scope="row">{title}</th>
      <td>{flag?<input type="text" name={name} value={value ? value : ""} onChange={onChange} /> : value}</td>
  </tr>
)
