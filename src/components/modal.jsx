

export const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div >
      <div >
        {children}
      </div>
    </div>
  );
};
