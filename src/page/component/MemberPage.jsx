import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MemberForm from "./memberForm";
import { fetchMembers, addMember, updateMember, deleteMember } from "../../mock";

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [currentMember, setCurrentMember] = useState(null); // For editing
  const [openForm, setOpenForm] = useState(false); // Open/close form
  const [deleteDialog, setDeleteDialog] = useState(false); // Open/close delete dialog
  const [memberToDelete, setMemberToDelete] = useState(null); // Selected member to delete

  // Fetch members when the component mounts
  useEffect(() => {
    const loadMembers = async () => {
      const data = await fetchMembers();
      setMembers(data);
    };
    loadMembers();
  }, []);

  // Open the member form (for editing or adding)
  const handleOpenForm = (member = null) => {
    setCurrentMember(member);
    setOpenForm(true);
  };

  // Close the member form
  const handleCloseForm = () => {
    setCurrentMember(null);
    setOpenForm(false);
  };

  // Save a member (add or edit)
  const handleSaveMember = async (member) => {
    if (member.id) {
      await updateMember(member.id, member); // Update API call
    } else {
      await addMember(member); // Add API call
    }
    const updatedMembers = await fetchMembers(); // Refresh the list
    setMembers(updatedMembers);
    handleCloseForm();
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (member) => {
    setMemberToDelete(member);
    setDeleteDialog(true);
  };

  // Confirm deletion
  const handleDeleteMember = async () => {
    await deleteMember(memberToDelete.id); // Delete API call
    const updatedMembers = await fetchMembers(); // Refresh the list
    setMembers(updatedMembers);
    setDeleteDialog(false);
    setMemberToDelete(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Member Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpenForm()}>
        Add Member
      </Button>

      {/* Members Table */}
      <Table style={{ marginTop: "20px" }}>
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Name (EN)</TableCell>
            <TableCell>Name (JP)</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Group</TableCell>
            <TableCell>Other</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <Avatar>{member.name_en?.[0] || "?"}</Avatar>
              </TableCell>
              <TableCell>{member.name_en}</TableCell>
              <TableCell>{member.name_jp}</TableCell>
              <TableCell>{member.email}</TableCell>
              <TableCell>{member.department}</TableCell>
              <TableCell>{member.group}</TableCell>
              <TableCell>{member.other}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpenForm(member)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteDialog(member)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Member Form */}
      <MemberForm
        open={openForm}
        member={currentMember}
        onClose={handleCloseForm}
        onSave={handleSaveMember}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Member</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this member?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteMember} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MemberPage;
