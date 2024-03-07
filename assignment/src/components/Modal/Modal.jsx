import './Modal.css'

const Modal = ({ isOpen, onClose, children }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={handleClose}>&times;</span>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
