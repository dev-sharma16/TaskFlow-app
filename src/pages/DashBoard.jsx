import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components";
import DroppableColumn from "../components/DroppableColumn";
import { DndContext,closestCorners,
         useSensor,useSensors,
         PointerSensor,DragOverlay } from "@dnd-kit/core";

function Dashboard() {
  
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
  })

  const [loading,setLoading] = useState(true)
  const userData = useSelector((state)=> state.auth.userData)
  const navigate = useNavigate()

  const statusLabels = {
    todo: "To Do",
    inProgress: "In Progress",
    done: "Completed",
  };

  useEffect(()=>{
    const fetchTasks = async()=>{
      try {
        if (!userData) {
           navigate("/login")
           return
        }

        const response = await service.getTaskByUser(userData.$id)

        const grouped = {
          todo:[],
          inProgress:[],
          done:[],
        }

        response.documents.forEach((task)=>{
          const status = task.status
          if(grouped[status]){
            grouped[status].push(task)
          }
        })

        setTasks(grouped)
      } 
      catch (error) {
        throw error
      }
      finally{
        setLoading(false)
      }
    }

    fetchTasks()
  },[userData,navigate])

  // Drag and Drop functionality
  const [activeDragTask, setActiveDragTask] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const findTaskById = (id) => {
    for (const status in tasks) {
      const task = tasks[status].find((t) => t.$id === id);
      if (task) return task;
    }
    return null;
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await service.updateTask(taskId, { status: newStatus });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const moveTaskLocally = (taskId, fromStatus, toStatus) => {
    const taskToMove = tasks[fromStatus].find((t) => t.$id === taskId);
    if (!taskToMove) return;

    taskToMove.status = toStatus;

    setTasks((prev) => ({
      ...prev,
      [fromStatus]: prev[fromStatus].filter((t) => t.$id !== taskId),
      [toStatus]: [taskToMove, ...prev[toStatus]],
    }));
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const task = findTaskById(active.id);
    if (task) setActiveDragTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    setActiveDragTask(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const task = findTaskById(activeId);
    if (!task || task.status === overId) return;

    updateTaskStatus(activeId, overId);
    moveTaskLocally(activeId, task.status, overId);
  };
  
  if (loading) return <div className="text-center mt-10 text-xl">Loading tasks...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart} 
        onDragEnd={handleDragEnd}    
        sensors={sensors}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["todo", "inProgress", "done"].map((status) => (
            <div
              key={status}
              className="bg-white rounded shadow p-2 md:p-4"
            >
              <h2 className="text-xl font-semibold capitalize mb-4 text-center text-gray-700">
                {statusLabels[status]}
              </h2>
              <DroppableColumn id={status}>
                {tasks[status].length > 0 ? (
                  tasks[status].map((task) => (
                    <TaskCard
                       key={task.$id}
                       task={task}
                       isDragging={activeDragTask?.$id === task.$id}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center">No tasks</p>
                )}
              </DroppableColumn>
            </div>
          ))}
        </div>
        {/*  Drag overlay that follows the cursor */}
        <DragOverlay>
          {activeDragTask ? <TaskCard task={activeDragTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default Dashboard;
