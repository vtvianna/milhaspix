import Stepper from '../layout/Stepper'
import styles from "./PassoDois.module.css";

function PassoDois () {
return(

 <section className={styles.tiles} >    
    <Stepper currentStep={1} />
    <div className={styles.container}>

    </div>
        
    </section>
    
)
    


}
export default PassoDois