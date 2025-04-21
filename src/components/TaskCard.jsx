import {Link} from "react-router-dom"
import { useDraggable } from "@dnd-kit/core"


const TaskCard = ({task, isDragging = false})=>{
    // Drag and Drop func 
    const {attributes, listeners, setNodeRef, transform}= useDraggable({
        id: task.$id,
    })

    const style = {
      transform: transform
         ? `translate(${transform.x}px, ${transform.y}px)`
         : undefined,
      opacity: isDragging ? 0 : 1, 
      boxShadow: isDragging ? "0 0 0 1px #aaa" : undefined,
      cursor: "grab",
      pointerEvents: isDragging ? "none" : "auto", 
      transition: "opacity 0.2s ease",
    }
 
    return(
        <Link to={`/task/${task.$id}`}>
          <div 
               ref={setNodeRef}
               style={style}
               {...listeners}
               {...attributes}
               className="mb-4 p-4 rounded-xl bg-white border border-slate-200 hover:shadow-md transition duration-200"
             >
              <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
              <p className="text-sm text-slate-600 mt-1">{task.description}</p>
              <p className="text-xs text-slate-500 mt-3">
                Due: {task.dueDate || "No due date"}
              </p>
          </div>
        </Link>
    )
}

export default TaskCard