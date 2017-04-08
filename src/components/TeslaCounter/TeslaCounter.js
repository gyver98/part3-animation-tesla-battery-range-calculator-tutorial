import React from 'react';
import './TeslaCounter.css';

class TeslaCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animationEffect: false,
      direction: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentValue, initValues } = nextProps;
    if (this.props.currentValue !== nextProps.currentValue) {
      const direction = this.props.currentValue < nextProps.currentValue ? 'increase' : 'decrese';
      this.setState({
        animationEffect: true,
        direction
      });

      setTimeout(
        () => {
          this.setState({
            animationEffect: false
          })
        }, 500
      );
      return;  
    } 
  }
  
  render() {
    const { initValues, currentValue, increment, decrement } = this.props;
    const { animationEffect, direction } = this.state;
    const animationClass = animationEffect
                      ? (direction==='increase'? 'flip-in-hor-top' : 'flip-in-hor-bottom')
                      : '';
    
    return (
      <div className="tesla-counter">
        <p className="tesla-counter__title">{initValues.title}</p>
        <div className="tesla-counter__container cf">
          <div className="tesla-counter__item">
            <div className={`${animationClass}`}>
              <p className="tesla-counter__number ">
                { currentValue }
                <span>{ initValues.unit }</span>
              </p>
            </div>
            <div className="tesla-counter__controls">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  increment(currentValue)}} 
                disabled={currentValue >= initValues.max} 
              >
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  decrement(currentValue)}} 
                disabled={currentValue <= initValues.min} 
              >
              </button>
            </div>
          </div>
        </div>
      </div>
    )    
  }
};

TeslaCounter.propTypes = {
  currentValue: React.PropTypes.number,
  increment: React.PropTypes.func,
  decrement: React.PropTypes.func,
  initValues: React.PropTypes.object
}

export default TeslaCounter;