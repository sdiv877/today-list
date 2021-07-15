import React, { FC } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

interface DeleteDataModal {
    show: boolean,
    setShow: (show: boolean) => void,
}

const DeleteDataModal: FC<DeleteDataModal> = (props): JSX.Element => {

    function handleConfirmDeletion() {
        window.api.deleteAllData();
        props.setShow(false);
    }

    const handleClose = () => {
        props.setShow(false);
    };

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.show}>
                <DialogTitle id="customized-dialog-title">
                    Confirm Deletion
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        This will delete all your current tasks, including completed ones and the contents of the Recycle Bin.
                    </Typography>

                    <Typography gutterBottom>
                        Your User Profile will also be reset.
                    </Typography>

                    <Typography gutterBottom>
                        This process is irreversible. Are you sure you wish to continue?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant='contained' style={{ backgroundColor: 'crimson', color: 'white', fontWeight: 'bold' }} autoFocus onClick={handleConfirmDeletion} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteDataModal;