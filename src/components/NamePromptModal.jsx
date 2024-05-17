import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
} from "@material-tailwind/react";
import { useAuth } from "../contexts/AuthContext";

function NamePromptModal({ isOpen = true, onSave }) {
  const { handleAnonymousLogin } = useAuth();
  const [name, setName] = useState("");

  const handleNameSave = () => {
    if (name.trim() === "") {
      alert("Por favor, introduce un nombre.");
      return;
    }

    handleAnonymousLogin(name)
      .then(() => {
        console.log("Nombre establecido para el usuario anónimo", name);
        setName(""); // Resetea el campo de nombre para el próximo uso
        onSave(); // Cierra el modal si es necesario o realiza acciones adicionales
      })
      .catch((error) => {
        console.error(
          "Error al establecer el nombre para el usuario anónimo:",
          error
        );
      });
  };

  return (
    <Dialog size="md" open={isOpen}>
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
        <Button onClick={handleNameSave}>Guardar</Button>
      </DialogFooter>
    </Dialog>
  );
}

export default NamePromptModal;
