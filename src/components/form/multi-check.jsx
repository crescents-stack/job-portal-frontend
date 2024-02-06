/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { indigo } from "@mui/material/colors";

const FormInputMultiCheckbox = ({
  name,
  control,
  setValue,
  label,
  defaultValues,
  options,
}) => {
  const [selectedItems, setSelectedItems] = useState(defaultValues ?? []);
  // we are handling the selection manually here
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };
  // we are setting form value manually here
  useEffect(() => {
    setValue(name, selectedItems);
  }, [name, selectedItems, setValue]);
  return (
    <FormControl size={"small"} variant={"outlined"}>
      <FormLabel component="legend">{label}</FormLabel>
      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  // eslint-disable-next-line no-unused-vars
                  render={({ field }) => {
                    return (
                      <Checkbox
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                        sx={{
                          color: indigo[800],
                          "&.Mui-checked": {
                            color: indigo[600],
                          },
                        }}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label.replaceAll("BN", "BD")}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
};

export default FormInputMultiCheckbox;
