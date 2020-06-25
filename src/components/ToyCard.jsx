import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    const { name, image, likes } = this.props.toy
    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt="{/* Toy's Name */}" className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={() => this.props.addLike(this.props.toy)} className="like-btn">Like {'<3'}</button>
        <button onClick={() => this.props.deleteToy(this.props.toy)} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
