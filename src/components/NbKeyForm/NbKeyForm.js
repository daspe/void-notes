// Input form component for submitting a notebook key
import React from 'react';

function NbKeyForm({ onChange, onSubmit }) {
  return (
    <div>
      <p className='f3'>
        {'Load a previous notebook with it\'s key'}
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input
            className='f4 pa1 w-70 center'
            type='text'
            placeholder='Enter Notebook Key'
            onChange={onChange}
          />
          <button
            className='w-30 grow f4 link ph3 pv2 dib white bg-green'
            onClick={onSubmit}
          >Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default NbKeyForm;