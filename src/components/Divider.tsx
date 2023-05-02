import React from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode;
};

function Divider({ children, className }: Props) {
  return (
    <div className={`relative my-4 w-full opacity-20 ${className}`}>
      {children && (
        <span className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] px-2 text-xs">
          {children}
        </span>
      )}

      <hr className="border-t-[.5px] border-[var(--border-color)]" />
    </div>
  );
}

export default Divider;
