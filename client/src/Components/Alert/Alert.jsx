import "./Alert.css";

const Alert = ({ onConfirm, onCancel, text }) => {
  return (
    <div className="alert-outer">
      <div className="alert-container">
        <h3 className="alert-text">{text}</h3>
        <div className="button-container">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-button" onClick={onConfirm}>
            Ok!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
