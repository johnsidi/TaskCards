import React, { useState } from 'react';

function FilterButton(props) {
  const [filter, setFilter] = useState('All');
  return (
    <button
      type='button'
      className='btn toggle-btn'
      aria-pressed={props.isPressed}
      onClick={() => {
        setFilter(props.name);
        props.propertyFilterHandler(props.FILTER_MAP[filter]);
      }}
    >
      <span className='visually-hidden'>Show </span>
      <span>{props.name}</span>
      <span className='visually-hidden'>
        {' '}
        tasks 
      </span>
    </button>
  );
}
export default FilterButton;
