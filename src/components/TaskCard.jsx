import { useNavigate } from "react-router-dom"
import { useDraggable } from "@dnd-kit/core"
import { useState, useEffect, useRef } from "react";

const TaskCard = ({task, isDragging = false})=>{
    // Drag and Drop func 
    const {attributes, listeners, setNodeRef, transform}= useDraggable({
        id: task.$id,
    })
    
    const navigate = useNavigate();
    const [isDraggableNow, setIsDraggableNow] = useState(false);
    const holdTimeoutRef  = useRef(null)
    const hasMovedRef = useRef(false);

    const style = {
      transform: transform
         ? `translate(${transform.x}px, ${transform.y}px)`
         : undefined,
      opacity: isDragging ? 0 : 1, 
      boxShadow: isDragging ? "0 0 0 1px #aaa" : undefined,
      cursor: isDraggableNow ? "grab" : "pointer",
      pointerEvents: isDragging ? "none" : "auto", 
      transition: "opacity 0.2s ease",
    }
     
    const handleMouseDown = () => {
      hasMovedRef.current = false;
  
      holdTimeoutRef.current = setTimeout(() => {
        setIsDraggableNow(true);
      }, 150);
    };

    const handleMouseMove = () => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        clearTimeout(holdTimeoutRef.current);
        setIsDraggableNow(true);
      }
    };

    const handleMouseUp = () => {
      clearTimeout(holdTimeoutRef.current);
  
      if (!isDraggableNow) {
        navigate(`/task/${task.$id}`);
      }
    };

    const handleMouseLeave = () => {
      clearTimeout(holdTimeoutRef.current);
    };

    useEffect(() => {
      function handleDragEnd() {
        setIsDraggableNow(false); // after drag end, reset
      }
  
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchend", handleDragEnd);
  
      return () => {
        window.removeEventListener("mouseup", handleDragEnd);
        window.removeEventListener("touchend", handleDragEnd);
      };
    }, []);

    return(
          <div 
            ref={setNodeRef}
            style={style}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            onTouchCancel={handleMouseLeave}
            {...(isDraggableNow ? { ...listeners, ...attributes } : {})}
            className="mb-4 p-4 rounded-xl bg-white border border-slate-200 hover:shadow-md transition duration-200"
          >
              <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{task.description}</p>
              <p className="text-xs text-slate-500 mt-3">
                Due: {task.dueDate || "No due date"}
              </p>
          </div>
     )
}

export default TaskCard