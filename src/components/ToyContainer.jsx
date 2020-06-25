import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  // console.log("TEST",props.toys)
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard toy={toy} addLike={props.addLike} deleteToy={props.deleteToy} /> )}
    </div>
  );
}

export default ToyContainer;
