import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const MemberForm = ({ open, member, onClose, onSave }) => {
  const [formState, setFormState] = React.useState(member || {});

  React.useEffect(() => {
    setFormState(member || {});
  }, [member]);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    onSave(formState);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{member ? "Edit Member" : "Add Member"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name (English)"
          fullWidth
          margin="dense"
          value={formState.name_en || ""}
          onChange={handleChange("name_en")}
        />
        <TextField
          label="Name (Japanese)"
          fullWidth
          margin="dense"
          value={formState.name_jp || ""}
          onChange={handleChange("name_jp")}
        />
        <TextField
          label="Email"
          fullWidth
          margin="dense"
          value={formState.email || ""}
          onChange={handleChange("email")}
        />
        <TextField
          label="Department"
          fullWidth
          margin="dense"
          value={formState.department || ""}
          onChange={handleChange("department")}
        />
        <TextField
          label="Group"
          fullWidth
          margin="dense"
          value={formState.group || ""}
          onChange={handleChange("group")}
        />
        <TextField
          label="Other"
          fullWidth
          margin="dense"
          value={formState.other || ""}
          onChange={handleChange("other")}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberForm;
