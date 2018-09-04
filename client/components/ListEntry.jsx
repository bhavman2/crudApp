import React from 'react';

const ListEntry = (props) => {
  return (
    <div>
      {props.item}
      <button onClick={props.update}>Edit Item</button>
      <button onClick={props.delete}>Done</button>
    </div>
  );
};

export default ListEntry;