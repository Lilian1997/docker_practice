import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

type inputType = {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({ value, onChange }: inputType) => {
  return (
    <>
      <TextField
        variant="outlined"
        type="number"
        role="textbox"
        aria-label="input"
        inputProps={{ "data-testid": "content-input" }}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default InputField;
