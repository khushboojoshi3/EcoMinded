import React from 'react';
import Header from '../../components/Header/Header';
import styles from  './Store.module.css';
import Reward from '../../assets/reward.gif';
import Netflix from '../../assets/netflix.png';
import Myntra from '../../assets/myntra.png';
import Amazon from '../../assets/amazon.png';
import Flipkart from '../../assets/flipkart.png';
import coin from '../../assets/coins.gif';






function Store(){
     const playclick =()=>{
        console.log('Click');
    }
    return(
        <>
        <Header/>
        <div ClassName={styles.store}>
        <div className={styles.bg}>
            <img src={Reward}/>
            <h1>Claim your rewards!</h1>
            <div className={styles.front_row}>
                <div className={styles.reward1}>
                   <div className={styles.rewardrec1}>
                    <div className={styles.netflix}>
                     <img src={Netflix} onClick={playclick}/>
                      <h1>25% OFF</h1>
                      <div className={styles.coins}>
                        <img src={coin}></img>
                        <p>3000</p>
                      </div>
                    </div>
                    

                 </div>

                </div>
                <div className={styles.reward2}>
                   <div className={styles.rewardrec2}>
                    <div className={styles.myntra}>
                     <img src={Myntra} onClick={playclick}/>
                      <h1>35% OFF</h1>
                      <div className={styles.coinsmyn}>
                        <img src={coin}></img>
                        <p>2000</p>
                      </div>
                    </div>
                    

                 </div>

                </div>
            </div>
            <div className={styles.second_row}>
                <div className={styles.reward3}>
                   <div className={styles.rewardrec3}>
                    <div className={styles.amazon}>
                     <img src={Amazon} onClick={playclick}/>
                      <h1>20% OFF</h1>
                      <div className={styles.coinsama}>
                        <img src={coin}></img>
                        <p>1800</p>
                      </div>
                    </div>
                    

                 </div>

                </div>
                <div className={styles.reward4}>
                   <div className={styles.rewardrec4}>
                    <div className={styles.flipkart}>
                     <img src={Flipkart} onClick={playclick}/>
                      <h1>15% OFF</h1>
                      <div className={styles.coinsflip}>
                        <img src={coin}></img>
                        <p>1500</p>
                      </div>
                    </div>
                    

                 </div>

                </div>
            </div>

        </div>
        </div>
        </>
    );
}
export default Store;

