import React, { Component } from 'react';
import MyButton from './Button';
import Fade from 'react-reveal/Fade';
import Styles from './Questions.module.css';

const Popup =({score, total,text,title, buttonText,style,popupHandle})=> {
    
    
    // constructor(props) {
    //     super(props);
        
    //     this.state = {
    //         time: 'start',
    //         title: 'Welcome to Green Quiz',
    //         text: 'How GREEN are you? <br/> There is no PLANet B<br /><br />',
    //         buttonText: 'GO Green!' 
    //     };
        
    //     this.popupHandle = this.popupHandle.bind(this);
    // }

    
    // popupHandle() {
    //     let { time } = this.state;
        
    //     if(time === 'start'){
    //         this.setState({
    //             time: 'end',
    //             title: 'Congratulations!',
    //             buttonText: 'Restart'
    //         });

    //         //alert("START THE QUIZ");
    //         this.props.startQuiz();
    //     } else {
            
    //         //alert("FINISHED QUIZ");            
    //         window.location.reload();// restart the application
    //     }
    // }
     
    // createMarkup(text) {
    //     return {__html: text};
    // }
    
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         text: 'You have completed the quiz. <br /> You got: <strong>' + this.props.score + 
    //         '</strong> out of <strong>' + 
    //         this.props.total +
    //         '</strong> questions right.'
    //     })
    // }

    
    // render() {
       
    //     let { title, text, buttonText } = this.state;
        
    //     let { style } = this.props;
        
        return (
            <Fade delay={300}>
                <div className={Styles.popup_container} style={style}>
                    <div className="container">
                        <div className="ml-5 col-md-10 col-10">
                            <div className={Styles.popup}>
                                <h1>{title}</h1>
                                {score && <p>You have completed the quiz. <br /> You got: <strong> {score} 
    //         <strong> out of </strong>  {total} 
    //         </strong> questions right.</p>}
                                {/* <p dangerouslySetInnerHTML={this.createMarkup(text)} /> */}
                               {text&&<p>{text}</p>}
                                <span onClick={popupHandle}>
                                    <MyButton 
                                        text={buttonText}
                                        bck='#3F9256'
                                        color='#fff'
                                        
                                        
                                    >
                                        </MyButton>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }


export default Popup; 

