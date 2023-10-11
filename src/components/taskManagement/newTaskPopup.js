import React from "react";
import {
  Button,
  MenuItem,
  TextField,
  Dialog,
  DialogTitle,
  DialogActions,
  InputLabel,
  FormControl,
  Select,
  Alert,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Box } from "@material-ui/core";
const TaskPopup = (props) => {
  const {
    createTask,
    createNewTask,
    cancleTask,
    closePopup,
    taskName,
    setTaskName,
    taskPriority,
    setTaskPriority,
    taskDedline,
    setTaskDedline,
    saveEditedTask,
    popupType,
    error,
  } = props;

  return (
    <Dialog
      className="create-task-menu"
      maxWidth={"sm"}
      open={createTask}
      onClose={() => {
        closePopup();
      }}
    >
      <DialogTitle color="primary">
        {popupType === "edit" ? "Edit Task" : "Create New Task"}
      </DialogTitle>
      <Alert
        sx={{
          display: error.flag ? "flex" : "none",
          flexDirection: "row",
          marginBottom: "5px",
        }}
        severity="error"
      >
        {error.message}
      </Alert>

      <TextField
        className="text-field"
        label="Task Name"
        placeholder="Task Name"
        fullWidth
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      {/* <Box className="slider-stage">
        <Typography>Stage</Typography>
        <Slider
          className="stage-slider"
          size="small"
          valueLabelDisplay="auto"
          aria-label="custom thumb label"
          value={taskStage}
          onChange={(e, value) => {
            if (typeof value === "number") {
              setTaskStage(value);
            }
          }}
          defaultValue={0}
          min={0}
          step={1}
          max={3}
        />
      </Box> */}
      <Box>
        <FormControl sx={{ m: "20px 0px", minWidth: 150 }}>
          <InputLabel id="demo-simple-select-autowidth-label">
            Task Priority
          </InputLabel>
          <Select
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            label="Task Priority"
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateField", "DateField"]}>
            <DateField
              label="Task Dedline"
              value={taskDedline}
              onChange={(newValue) => setTaskDedline(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
      <DialogActions sx={{ margin: "5px" }}>
        <Button variant="outlined" onClick={cancleTask}>
          Cancel
        </Button>
        <Button
          onClick={() =>
            popupType === "edit" ? saveEditedTask() : createNewTask()
          }
          variant="outlined"
        >
          {popupType === "edit" ? "Edit Task" : "Create New Task"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskPopup;
