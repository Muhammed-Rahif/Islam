import React from 'react';

type Props = {
  text?: string;
  className?: string;
};

function Divider({ text, className }: Props) {
  return (
    <div className={`my-4 w-full opacity-20 relative ${className}`}>
      {text && (
        <p className="absolute text-xs bg-[var(--background)] px-2 z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {text}
        </p>
      )}

      <hr className="border-t-[.5px] border-[var(--border-color)]" />
    </div>
  );
}

export default Divider;
