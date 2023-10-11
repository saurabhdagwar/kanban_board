import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { Button, Avatar, Box, Snackbar, Stack } from "@mui/material";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import dayjs from "dayjs";
import uniqid from "uniqid";
import TaskPopup from "./newTaskPopup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "react-toastify/dist/ReactToastify.css";
import MuiAlert from "@mui/material/Alert";
import $ from "jquery";
import TaskCard from "./taskCard";

const TaskManagement = (props) => {
  const [createTask, setCreateTask] = useState(false);
  const [popupType, setPopupTypes] = useState("");
  const [editedTaskId, setEditedId] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [taskStage, setTaskStage] = useState(0);
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskDedline, setTaskDedline] = useState(dayjs("2023-08-01"));
  const { taskColumn, userData, setUserData } = props;
  const [error, setError] = useState({
    flag: false,
    message: "",
  });
  const [toast, setToast] = useState({
    flag: false,
    message: "",
  });

  const dragDropRef = useRef(null);
  const deleteZone = useRef(null);

  const toastClose = () => {
    setToast({
      flag: false,
      message: "",
    });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    setTimeout(() => {
      initializeDraggables();
      if (dragDropRef.current) {
        const elements = dragDropRef.current.querySelectorAll(".dropzones");
        if (elements && elements.length) {
          createDroppables(elements);
        }
      }
      if (deleteZone.current) {
        const elements = deleteZone.current.querySelectorAll(".delete-zone");
        if (elements && elements.length) {
          deleteDroppedTasks(elements);
        }
      }
    }, 20);
  }, [userData]);

  const deleteDroppedTasks = (elements) => {
    $(elements).droppable({
      tolerance: "pointer",
      greedy: true,
      drop: function (event, ui) {
        const crData = JSON.parse(ui.helper[0].getAttribute("data-id"));
        deleteData(crData.taskId);
      },
    });
  };
  const createDroppables = (elements) => {
    $(elements).droppable({
      tolerance: "pointer",
      greedy: true,
      drop: function (event, ui) {
        //
        if (
          event.target.getAttribute("data-name") ===
          ui.helper[0].getAttribute("data-name")
        ) {
          ui.helper[0].style.top = 0;
          ui.helper[0].style.left = 0;
        } else {
          const crData = JSON.parse(ui.helper[0].getAttribute("data-id"));

          let previousData = JSON.parse(JSON.stringify(userData));
          let updatedData = previousData.map((task) => {
            if (task.taskId === crData.taskId) {
              return {
                ...task,
                stage: parseInt(event.target.getAttribute("data-name")),
              };
            } else {
              return task;
            }
          });
          setUserData(updatedData);
        }
      },
    });
  };

  const initializeDraggables = () => {
    if (dragDropRef.current) {
      const draggableItems = dragDropRef.current.querySelectorAll(".draggable");

      if (draggableItems) {
        $(draggableItems).draggable({
          containment: ".task-manage-main",
          revertDuration: 200,
          start: function (event, ui) {
            // const { id } = ui.helper[0].dataset;
          },
          revert: function (val) {
            if (val) {
              return false;
            }
            return true;
          },
        });
      }
    }
  };

  const cancleTask = () => {
    setCreateTask(false);
    setPopupTypes("");
    setTaskName("");
    setTaskStage(0);
    setEditedId(null);
    setTaskPriority("low");
    setTaskDedline(dayjs("2023-08-01"));
    setError({ flag: false, message: "" });
  };

  const createNewTask = () => {
    if (taskName !== "" && taskName !== null) {
      const currentTask = {
        name: taskName,
        stage: taskStage,
        priority: taskPriority,
        dedline: taskDedline,
        taskId: uniqid(),
      };
      let previousData = JSON.parse(JSON.stringify(userData));
      setUserData([...previousData, currentTask]);
      cancleTask();
      setError({ flag: false, message: "" });
    } else {
      setError({ flag: true, message: "Please Enter Task Name" });
    }
  };

  const changeTaskStage = (taskId, stage) => {
    if (stage != null) {
      let previousData = JSON.parse(JSON.stringify(userData));
      let updatedData = previousData.map((task) => {
        if (task.taskId === taskId) {
          return { ...task, stage: stage };
        } else {
          return task;
        }
      });
      setUserData(updatedData);
    }
  };
  const deleteData = (taskId) => {
    let previousData = JSON.parse(JSON.stringify(userData));
    let updatedData = previousData.filter((task) => {
      return task.taskId !== taskId;
    });
    // toast("Task Deleted Successfully");
    setToast({ flag: true, message: "Task Deleted Successfully" });
    setUserData(updatedData);
  };

  const editData = (taskId) => {
    // debugger;
    let previousData = JSON.parse(JSON.stringify(userData));
    let currentTask = previousData.filter((task) => {
      return task.taskId === taskId;
    });
    // if (taskName != "" && taskName != null) {
    setTaskName(currentTask[0].name);
    setTaskStage(currentTask[0].stage);
    setTaskPriority(currentTask[0].priority);
    setTaskDedline(dayjs(`${currentTask[0].dedline}`));
    setEditedId(taskId);
    setPopupTypes("edit");
    setCreateTask(true);
    setError({ flag: false, message: "" });
    // }
  };

  const saveEditedTask = () => {
    if (editedTaskId !== null && taskName !== "" && taskName !== null) {
      let previousData = JSON.parse(JSON.stringify(userData));
      let updatedData = previousData.map((task) => {
        if (editedTaskId === task.taskId) {
          return {
            name: taskName,
            stage: taskStage,
            priority: taskPriority,
            dedline: taskDedline,
            taskId: editedTaskId,
          };
        } else {
          return task;
        }
      });
      setUserData(updatedData);
      cancleTask();
    } else {
      setError({ flag: true, message: "Please Enter Task Name" });
    }
  };

  return (
    <div className="task-manage-main">
      <div className="create-task-main">
        <Button
          color="primary"
          variant="outlined"
          sx={{ marginTop: "10px" }}
          onClick={() => {
            setPopupTypes("create");
            setCreateTask(true);
          }}
          aria-haspopup="true"
        >
          <Avatar color="primary" sx={{ margin: "2px" }}>
            <NoteAddIcon />
          </Avatar>
          <span>Create Task</span>
        </Button>

        <TaskPopup
          createTask={createTask}
          error={error}
          createNewTask={createNewTask}
          cancleTask={cancleTask}
          setCreateTask={setCreateTask}
          closePopup={cancleTask}
          setPopupTypes={setPopupTypes}
          taskName={taskName}
          setTaskName={setTaskName}
          taskStage={taskStage}
          setTaskStage={setTaskStage}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          taskDedline={taskDedline}
          setTaskDedline={setTaskDedline}
          saveEditedTask={saveEditedTask}
          popupType={popupType}
        />
      </div>
      <div className="task_list" ref={dragDropRef}>
        {taskColumn.map((column, index) => {
          return (
            <div
              className="task_column dropzones"
              data-name={index}
              key={index}
            >
              <div className="column-header">{column.name}</div>
              <div className="column-task">
                {userData.map((tasks, ind) => {
                  if (column.stage === tasks.stage) {
                    return (
                      <TaskCard
                        ind={`${tasks}${ind}`}
                        index={index}
                        tasks={tasks}
                        changeTaskStage={changeTaskStage}
                        editData={editData}
                        deleteData={deleteData}
                        key={ind}
                      />
                    );
                  }
                })}
              </div>
            </div>
          );
        })}
      </div>
      <Box className="delete-parent" ref={deleteZone}>
        <Box className="delete-zone " data-name="delete">
          <HighlightOffIcon variant="outlined" sx={{ fontSize: "100px" }} />
        </Box>
      </Box>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={toast.flag}
          autoHideDuration={6000}
          onClose={toastClose}
        >
          <Alert onClose={toastClose} severity="success" sx={{ width: "100%" }}>
            {toast.message}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};
export default TaskManagement;
