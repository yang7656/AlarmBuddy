import React, { Component } from 'react';

class Clock extends Component {

    constructor(props) {
        super(props);
        this.state = {
            day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
            secondAngle: 0,
            minuteAngle: 0,
            hourAngle: 0
        };
    }

    tick() {
        this.setState(state => ({
            day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'],
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        }));
    }

    handsAngleUpdate() {
        let time = new Date();
        this.secondAngle = (time.getSeconds() + time.getMilliseconds()/1000)*6;
        this.minuteAngle = time.getMinutes()*6 + 0.1*time.getSeconds();
        this.hourAngle = time.getHours()*30 + 0.5*time.getMinutes();
    }
    
    componentDidMount() {
        this.handsAngleUpdate();
        this.tiktok = setInterval(() => this.handsAngleUpdate(), 1000);
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.tiktok);
        clearInterval(this.interval);
    }

    render() {

        let hours = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];
        let circle = hours.map((scale) => {
            return <div key={scale} className="circle" style={{transform: `rotateZ(${scale}deg)`}}></div>
        });
        
        return (
            <div>
                <h1>AlarmBuddy</h1>
                <div>
                    {this.state.time + ', ' + this.state.date + ', ' + this.state.day[new Date().getDay()]}
                    {circle}
                    <div className="secondHand" style={{transform: `rotateZ(${this.secondAngle}deg)`}}></div>
                    <div className="minuteHand" style={{transform: `rotateZ(${this.minuteAngle}deg)`}}></div>
                    <div className="hourHand" style={{transform: `rotateZ(${this.hourAngle}deg)`}}></div>
                </div>
            </div>
        );
    }
}
 
export default Clock;