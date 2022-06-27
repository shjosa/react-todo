import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

export interface NewTodoProps {
    open: boolean;
    handleClose: () => void;
    addToArray: (task: string) => void;
    dialogTitle: string;
    buttonText: string;
    inputLabel: string;
}

export function NewTodoDialog({ open, handleClose, addToArray, dialogTitle, buttonText, inputLabel }: NewTodoProps) {
    const [task, setTask] = useState("");

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setTask(e.target.value);
    }
    
    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        addToArray(task);
        setTask("");
        handleClose();
      }
    
    useEffect(() => {
        setTask("");
    }, [open]);

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <form onSubmit={onSubmit}>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <TextField fullWidth onChange={onChange} value={task} label={inputLabel} />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" type="submit">{buttonText}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
