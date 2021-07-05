import React, { FC } from "react";
import FocusTrap from "focus-trap-react";
import '../styles/AddTasksModal.css'

// Props types
interface AddTasksModalProps {
  show: boolean,
  setShow: (show: boolean) => void,
}

const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {

  // If show is not true, don't return the component
  if (!props.show) {
    return null;
  }

  return (
    <FocusTrap>
      {/*Bind onClick to modal so that an event can be generated. 
      Then inside modal content check if an area outside or 'cancel' was clicked */}
      <div className="modal" onClick={() => { props.setShow(false); }}>

        {/*On clicking outside modal-content, close the Modal*/}
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            Add Tasks
          </div>

          <div className="modal-body">
            <input placeholder="icon"></input>
            <br />
            <input placeholder="task"></input>
            <br />
            <input placeholder="date"></input>
          </div>

          <div className="modal-footer">
            <button className="button">Submit</button>

            {/*On clicking Cancel, hide the Modal*/}
            <button className="button" onClick={() => { props.setShow(false); }}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </FocusTrap>
  );
}

export default AddTasksModal;
