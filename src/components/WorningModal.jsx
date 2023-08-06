import { motion } from 'framer-motion';
import '../stylesheets/WorningModal.css';

export function WorningModal() {
    return (
        <motion.div
            className='WorningModal'
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.3, ease: [0, 0.71, 0.2, 1.01],
                scale: { type: 'spring', damping: 5, stiffness: 100, restDelta: 0.001 }
            }}
        >
            <i className='fa-solid fa-triangle-exclamation' />
            All fields are required
        </motion.div>
    )
}
