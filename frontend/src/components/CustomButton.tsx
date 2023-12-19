import React from "react";
import Button from "@mui/material/Button";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

type usageType = {
  usage: string;
  onClick: () => void;
};

const CustomButton = ({ usage, onClick }: usageType) => {
  return (
    <Button
      variant="contained"
      role="button"
      aria-label={usage === "decrement" ? "DecreButton" : "IncreButton"}
      onClick={onClick}
    >
      {usage === "decrement" ? <RemoveIcon /> : <AddIcon />}
    </Button>
  );
};

export default CustomButton;
