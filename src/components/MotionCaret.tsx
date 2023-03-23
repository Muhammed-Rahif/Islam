import { IonIcon, useIonViewDidEnter } from '@ionic/react';
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
    (async () => {
      if (!ref.current?.offsetTop) return;

      const ionContent = await document
        .querySelector('ion-content')
        ?.getScrollElement();
      console.log(ionContent, ref.current.offsetTop);
      setTimeout(() => {
        // ionContent?.scrollTo(0, ref.current?.offsetTop ?? 0);
      });
    })();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.span
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
