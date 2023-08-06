import { motion } from 'framer-motion';
import '../stylesheets/Loading.css';

export function Loading() {
  return (
    <motion.div className='Loading' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className='lds-spinner'>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div>

      <p className='loading_sms'>Server connection...</p>
    </motion.div>
  )
}
