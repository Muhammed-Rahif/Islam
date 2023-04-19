import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import { closeOutline } from 'ionicons/icons';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  onClose?: () => void;
  onClick?: () => void;
  className?: string;
};

function LastReadChip({ onClose, onClick, className }: Props) {
  return (
    <AnimatePresence>
      <motion.div
        dir="ltr"
        onClick={onClick}
        className={`last-read-marker absolute top-0 z-40 flex h-[3rem] w-48 items-center justify-center ${className}`}
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: '82%' }}
        exit={{ opacity: 0, x: '100%' }}
        whileHover={{ x: '28%' }}
        whileFocus={{ x: '28%' }}
        whileTap={{ x: '28%' }}
        transition={{ duration: 0.6 }}
      >
        <IonChip
          role="button"
          color="primary"
          className="bg-blue-500 text-white"
        >
          <IonLabel>Last Read</IonLabel>
          <IonIcon onClick={onClose} icon={closeOutline} />
        </IonChip>
      </motion.div>
    </AnimatePresence>
  );
}

export default LastReadChip;
