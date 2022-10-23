import { Box, TextField } from "@mui/material";
import { useState } from "react";
const TextInput = ({ setNumberOfHours, ...props }) => {
  const [textValue, setTextValue] = useState();
  return (
    <Box>
      <Box>
        <Box>
          <TextField
            type={props.type}
            id={props.id}
            label={props.label}
            size="small"
            fullWidth
            onChange={(e) => setNumberOfHours(e.target.value)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TextInput;
