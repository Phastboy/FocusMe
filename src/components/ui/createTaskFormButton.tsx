// src/components/ui/createTaskForm.tsx
"use client";
import React, { useState } from "react";
import Modal from "@/components/ui/modal";
import CreateTaskForm from "@/components/forms/createTaskForm";

const CreateTaskFormButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-green-500 text-white p-2 rounded"
      >
        Create Task
      </button>
      <Modal isOpen={isOpen} onClose={handleClose} title="Create Task">
        <CreateTaskForm onTaskCreated={handleClose} />
      </Modal>
    </>
  );
};

export default CreateTaskFormButton;
