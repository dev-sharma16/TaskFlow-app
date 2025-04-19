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
               className="mb-4 p-3 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition"
             >
              <h3 className="text-lg font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs mt-2 text-gray-500">
                Due: {task.dueDate || "No due date"}
              </p>
          </div>
        </Link>
    )
}

export default TaskCard