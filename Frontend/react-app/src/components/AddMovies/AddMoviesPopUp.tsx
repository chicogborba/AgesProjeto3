// src/components/AddMoviesPopUp.tsx
import React from 'react';
import WindowContainer from "../WindowContainer/WindowContainer";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddMoviesPopUp: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const logOnClose = () => {
    console.log("Close");
    onClose();
  }

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-100 transition-transform transform ${isOpen ? 'scale-100' : 'scale-0'}`}>
      <WindowContainer headerTitle={"Add Movie"} headerColor="bg-[#FF9B9B]" onClose={logOnClose}>
        teste
      </WindowContainer>
    </div>
  );
};

export default AddMoviesPopUp;
