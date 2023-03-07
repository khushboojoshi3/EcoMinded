import React, {Component} from 'react';
import {useState} from 'react';
import Styles from './Questions.module.css';

class Answers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAnswered: false,
            classNames: ['', '', '', '']
        }
        
        this.checkAnswer = this.checkAnswer.bind(this);
        this.clearClasses = this.clearClasses.bind(this);
    }
    
    checkAnswer(e) {
        let { isAnswered } = this.props;
        
        if(!isAnswered) {
            // this.clearClasses();
            let elem = e.currentTarget;
            let { correct, increaseScore } = this.props;
            let answer = Number(elem.dataset.id);
            let updatedClassNames = this.state.classNames;

            if(answer === correct){
                updatedClassNames[answer-1] = 'right';
                increaseScore();
            }
            else {
                updatedClassNames[answer-1] = 'wrong';
            }
            
            this.setState({
                classNames: updatedClassNames,
                
            })

            this.props.showButton();
            
            var myTime = setTimeout(() => {
                this.clearClasses();
                
            },1800);
        }
    }
    clearClasses(){
        this.setState({
            classNames: ['', '', '', '']
        })
        
    }
    render() {
        // this.clearClasses();
        let { answers } = this.props;
        let { classNames } = this.state;
        
        let transition = {
            transitionName: "example",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 300
        }
        
        
        return (
            <div id={Styles.answers}>
                <ul>
                   
                    
                    <li onClick={this.checkAnswer} 
                        className={Styles[classNames[0]]} data-id="1">
                            
                    <span>A</span> 
                    <p>{answers[0]}</p>
                    {console.log(Styles[classNames[0]])}</li>
                  

                    <li onClick={this.checkAnswer} 
                        className={Styles[classNames[1]]} data-id="2">
                     
                    <span>B</span> 
                    <p>{answers[1]}</p></li>

                    <li onClick={this.checkAnswer} 
                        className={Styles[classNames[2]]} data-id="3">
                    
                    <span>C</span> 
                    <p>{answers[2]}</p></li>

                    <li onClick={this.checkAnswer} 
                        className={Styles[classNames[3]]} data-id="4">
                    
                    <span>D</span> 
                    <p>{answers[3]}</p></li>
                </ul>
            </div>
        );
    }
}

export default Answers