// src/components/ui/updateFormButton.tsx
"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import UpdateForm from "@/components/forms/updateForm";

interface UpdateFormButtonProps {
  taskId: string;
}

const UpdateFormButton: React.FC<UpdateFormButtonProps> = ({ taskId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button onClick={handleOpen}>Update Task</button>
      <Modal isOpen={isOpen} onClose={handleClose} title="Update Task">
        <UpdateForm
          taskId={taskId}
          onTaskUpdated={() => {
            handleClose();
          }}
        />
      </Modal>
    </>
  );
};

export default UpdateFormButton;
