const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="error-wrapper">
      <div className="error-box">
        <span className="error-icon">⚠️</span>
        <p className="error-text">{message}</p>
        <button className="error-close" onClick={onClose}>
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;