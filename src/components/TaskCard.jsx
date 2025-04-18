import {Link} from "react-router-dom"

const TaskCard = ({task})=>{
    return(
        <Link to={`/task/${task.$id}`}>
          <div className="mb-4 p-3 border border-gray-300 rounded bg-gray-50 hover:bg-gray-100 transition">
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