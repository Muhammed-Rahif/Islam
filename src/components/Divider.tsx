import React from 'react';

type Props = {
  text?: string;
  className?: string;
};

function Divider({ text, className }: Props) {
  return (
    <div className={`relative my-4 w-full opacity-20 ${className}`}>
      {text && (
        <p className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] px-2 text-xs">
          {text}
        </p>
      )}

      <hr className="border-t-[.5px] border-[var(--border-color)]" />
    </div>
  );
}

export default Divider;
