import React, { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from "@material-tailwind/react";
import { useAuth } from '../contexts/AuthContext';

function NamePromptModal({ isOpen = true, onSave }) {
    const { setNameForAnonymousUser } = useAuth();
  const [name, setName] = useState('');

  const handleClose = () => {
    handleNameSave(name);
    setName(''); // Resetea el campo de nombre para el próximo uso

  };

  const handleNameSave = (name) => {

    // Llama a la función setNameForAnonymousUser desde el contexto de autenticación
    setNameForAnonymousUser(name)
      .then(() => {
        console.log("Nombre establecido para el usuario anónimo", name);
        onSave()
      })
      .catch((error) => {
        console.error(
          "Error al establecer el nombre para el usuario anónimo:",
          error
        );
      });
  };

  return (
    <Dialog size="md" open={isOpen} handler={handleClose}>
      <DialogHeader>Ingresa tu nombre</DialogHeader>
      <DialogBody>
        <Input
          type="text"
          size="md"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogBody>
      <DialogFooter>
        <Button 
          onClick={handleClose}
        >
          Guardar
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default NamePromptModal;
