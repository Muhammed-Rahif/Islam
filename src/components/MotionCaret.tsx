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

    // console.log(scrollWrapper, ref.current?.offsetTop);
    // scrollWrapper?.scrollTo({
    //   top: ref.current.offsetTop - 150,
    //   behavior: 'smooth',
    // });
    // ref.current?.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'nearest',
    //   inline: 'start',
    // });
    // window.scroll({ top: ref.current.offsetTop, behavior: 'smooth' });
    // (ref.current.parentNode as HTMLElement)!.scrollTop = ref.current?.offsetTop;

    setTimeout(() => {
      (ref.current as any).scrollIntoViewIfNeeded({ behavior: 'smooth' });
    }, 100);
  }, []);

  // useEffect(() => {
  //   (document.getElementById('motion-caret') as any)?.scrollIntoViewIfNeeded({
  //     behavior: 'smooth',
  //   });
  // }, [isLoading]);

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
