import React from 'react';
import Header from '../../components/Header/Header';
import styles from  './Quiz.module.css';
import quiz from '../../assets/quiz.jpg';
import trophy from '../../assets/trophy.gif';
import { Link } from 'react-router-dom';



import * as AiIcons from 'react-icons/ai';
function Quiz(){
    const playclick =()=>{
        console.log('Click');
    }

    return(
        <>
        <Header/>
        <div className={styles.quiz}>

          <div className={styles.gif}>
                <img src={quiz} />
                <div className={styles.button}>
                    <div className={styles.rect}>
                     <Link to="./questions" className={styles.playicon}>
                          <AiIcons.AiOutlinePlayCircle />
                      </Link>
                     <h1>Play Quiz!</h1>
                    </div>
                </div>
          </div>
    
          <div className={styles.leader}>
            <div className={styles.trophy}>
             <img src={trophy}/>
             </div>
            <h1>Leaderboard</h1>
            </div>
            <div className={styles.leadertable}>
             <div className={styles.tableheading}>
               <div className={styles.tablecont}>
                <div className={styles.colrank}>
                    <div className={styles.headrank}>
                    <h1>Rank</h1>
                    </div>
                    <div className={styles.rank1}>
                        <h1>1</h1>
                    </div>
                    <div className={styles.rank2}>
                        <h1>2</h1>
                    </div>
                    <div className={styles.rank3}>
                        <h1>3</h1>
                    </div>
                </div>
                 <div className={styles.colname}>
                    <div className={styles.headname}>
                    <h1>Name</h1>
                    </div>
                    <div className={styles.name1}>
                        <h1>Deepali</h1>
                    </div>
                     <div className={styles.name2}>
                        <h1>Samay</h1>
                    </div>
                     <div className={styles.name3}>
                        <h1>Hosana</h1>
                    </div>
                </div>
                 <div className={styles.colcoin}>
                    <div className={styles.headcoin}>
                    <h1>Coins</h1>
                    </div>
                    <div className={styles.coin1}>
                        <h1>600</h1>
                    </div>
                    <div className={styles.coin2}>
                        <h1>400</h1>
                    </div>
                    <div className={styles.coin3}>
                        <h1>300</h1>
                    </div>
                </div>
                </div>
                <hr className={styles.line1}></hr>
                <hr className={styles.line2}></hr>
                <hr className={styles.line3}></hr>
                <hr className={styles.line4}></hr>
                <hr className={styles.line5}></hr>
            
                
             </div>
            </div>
        
        </div>
        </>
    )
}
export default Quiz;