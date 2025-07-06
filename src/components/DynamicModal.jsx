import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const DynamicModal = ({
  open,
  onClose,
  title,
  children,
  actions,
  titleSx
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <DialogTitle sx={{ m: 0, p: 2, ...(titleSx || {}) }}>
        {title}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {!titleSx && <CloseIcon fontSize="small" />}
        </IconButton>
      </DialogTitle>
{/* dividers sx={{ p: 4 }} */}
      <DialogContent>  
        {children}
      </DialogContent>

      {actions && <DialogActions sx={{ p: 2 }}>{actions}</DialogActions>}
    </Dialog>
  );
};

export default DynamicModal;