import styles from './PassoUm.module.css'


import Stepper from '../layout/Stepper'

function PassoUm () {
return(

    <section className={styles.tiles}>
        
    <Stepper currentStep={0} />
        
    </section>
    
)

}
export default PassoUm