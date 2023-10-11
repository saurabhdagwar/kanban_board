import React from "react";
import { Typography } from "@material-ui/core";
import { IconButton } from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const TaskCard = (props) => {
  const { tasks, changeTaskStage, editData, deleteData, ind, index } = props;
  return (
    <div
      className="task-card draggable"
      data-name={index}
      key={`${ind}-task`}
      data-id={JSON.stringify(tasks)}
    >
      <Typography className="task-name-disp">{tasks.name}</Typography>
      <Typography className="task-data">
        {`Dedline: ${JSON.stringify(tasks.dedline).slice(1, 11)}`}
      </Typography>
      <Typography className="task-data">
        {`Priority: ${tasks.priority}`}
      </Typography>
      <div className="task-footer">
        <IconButton
          onClick={() =>
            changeTaskStage(
              tasks.taskId,
              tasks.stage > 0 ? tasks.stage - 1 : null
            )
          }
        >
          <ArrowCircleLeftOutlinedIcon />
        </IconButton>
        <IconButton
          onClick={() =>
            changeTaskStage(
              tasks.taskId,
              tasks.stage < 3 ? tasks.stage + 1 : null
            )
          }
        >
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => editData(tasks.taskId)}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => deleteData(tasks.taskId)}>
          <DeleteOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default TaskCard;
