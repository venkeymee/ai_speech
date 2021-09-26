import React from 'react';
import './styles.css';

export default class PageNotFound extends React.Component {
  constructor(props){
    super(props);
    console.log('>>PageNotFound-props: ', this.props);
  }

  render() {
    return (
      <div className='content'>
        <div>
          <h1> PAGE NOT FOUND </h1>
        </div>
      </div>
    )
  }
}