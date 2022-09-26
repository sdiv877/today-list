import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

interface DeleteDataModal {
  show: boolean;
  setShow: (show: boolean) => void;
  onConfirm: () => void;
}

const DeleteDataModal: FC<DeleteDataModal> = (props): JSX.Element => {
  const handleConfirmDeletion = () => {
    props.setShow(false);
    props.onConfirm();
  }

  const handleClose = () => {
    props.setShow(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.show}
      >
        <DialogTitle id="customized-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            This will delete all your current tasks, including completed ones
            and the contents of the Recycle Bin.
          </Typography>
          <Typography gutterBottom>
            Your User Profile will also be reset.
          </Typography>
          <Typography gutterBottom>
            This process is irreversible. Are you sure you wish to continue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: 'crimson',
              color: 'white',
              fontWeight: 'bold'
            }}
            onClick={handleConfirmDeletion}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDataModal;
