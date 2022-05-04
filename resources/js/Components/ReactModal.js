import React, { useState } from "react";
// import Modal from "react-modal";
import Button from "./Button";
import { Box } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { Backdrop } from "@material-ui/core";
import { Modal } from "@material-ui/core";
import { Grid } from "@material-ui/core";

export default function ReactModal({
  modalContent,
  modalTitle = 'Modal Title',
  modalOpenText = 'Buka',
  modalCloseText = 'Tutup',
  modalWidth = 'auto',
  modalHeight = 'auto'

}) {
  //this is for react modal
  // const [isOpen, setIsOpen] = useState(false);
  //this is material ui modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: modalWidth,
    height: modalHeight
  };
  
  //react modal
  // function toggleModal() {
  //   setIsOpen(!isOpen);
  // }

  return (
    <div className="App">
      {/* react modal purposes */}
      {/* <Button onClick={toggleModal}>Open modal</Button> */}
      <Button onClick={handleOpen}>{modalOpenText}</Button>

      <Modal
        //react modal props
        // isOpen={isOpen}
        // onRequestClose={toggleModal}
        open={open}
        onClose={handleClose}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Grid container>
                <Grid item sm={6}> 
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    {modalTitle}
                  </Typography>
                </Grid>
                <Grid item sm={6}>
                  <Box display="flex" justifyContent="flex-end">
                    <Button onClick={handleClose}>{modalCloseText}</Button>
                  </Box>
                </Grid>
            </Grid>
            <>{modalContent}</>
          </Box>
        </Fade>

      </Modal>
    </div>
  );
}
