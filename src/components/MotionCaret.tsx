import { IonIcon } from '@ionic/react';
import { AnimatePresence, motion } from 'framer-motion';
import { caretBackOutline } from 'ionicons/icons';
import { useEffect, useRef } from 'react';

interface MotionCaretProps {
  show: boolean;
  title?: string;
}

const MotionCaret: React.FC<MotionCaretProps> = ({ show, title }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    setTimeout(() => {
      (ref.current as any).scrollIntoViewIfNeeded({ behavior: 'smooth' });
    }, 780);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.span
          id="motion-caret"
          ref={ref}
          title={title}
          initial={{ width: '0rem', x: 1, opacity: 0 }}
          animate={{ width: '1.5rem', x: 0, opacity: 1 }}
          exit={{ width: '0rem', x: 1, opacity: 0 }}
          className="inline-block"
        >
          <IonIcon
            className="w-6 h-6"
            icon={caretBackOutline}
            color="primary"
          />
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default MotionCaret;
