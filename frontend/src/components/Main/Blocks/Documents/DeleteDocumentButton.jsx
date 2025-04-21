import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteDocument } from '../../../../api/api';

const DeleteDocumentButton = ({ 
  documentId,
  confirmText = "Вы уверены?", 
  size = 'medium',
  disabled = false,
  setIsOpen
}) => {
  const [isConfirming, setIsConfirming] = React.useState(false);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    try {
      dispatch(deleteDocument(documentId));
      setIsOpen(false);
    } catch (error) {
      return false;
    } 
    setIsConfirming(false);
  };
  
  const handleCancel = () => {
    setIsConfirming(false);
  };
  
  React.useEffect(() => {
    if (isConfirming) {
      const timer = setTimeout(() => {
        setIsConfirming(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isConfirming]);

  return (
    <div className={`delete-button-container ${size}`}>
      {isConfirming ? (
        <div className="confirm-delete">
          <span className="confirm-text">{confirmText}</span>
          <button 
            className="confirm-yes"
            onClick={handleClick}
            disabled={disabled}
          >
            Да
          </button>
          <button 
            className="confirm-no"
            onClick={handleCancel}
            disabled={disabled}
          >
            Нет
          </button>
        </div>
      ) : (
        <button 
          className={`delete-button ${disabled ? 'disabled' : ''}`}
          onClick={handleClick}
          disabled={disabled}
          aria-label="Удалить"
        >
          Удалить
        </button>
      )}
    </div>
  );
};

export default DeleteDocumentButton;