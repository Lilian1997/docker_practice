import TextField from "@mui/material/TextField";
import { ChangeEvent, FocusEvent } from "react";

type inputType = {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
};

const InputField = ({ value, onChange, onBlur }: inputType) => {
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
        onBlur={onBlur}
      />
    </>
  );
};

export default InputField;
