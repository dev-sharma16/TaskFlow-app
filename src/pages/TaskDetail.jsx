import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import service from "../appwrite/config";

export default function TaskDetail(){
    const {taskId} = useParams()
    const navigate = useNavigate()
    const [task,setTask] = useState()
    const [loading, setLoading] = useState(null)

    useEffect(()=>{
        service.getTaskById(taskId)
        .then((res)=>{
            setTask(res)
        })
        .catch(console.error)
        .finally(
            setLoading(false)
        )
    },[taskId])

    const handleDelete = async ()=>{
        const confirmDelete = confirm("Are you sure you want to delete this task?")
        if (!confirmDelete) {
            return
        }
        
        try {
            await service.deleteTask(taskId)
            navigate("/dashboard")
        } 
        catch (error) {
            throw error
        }
    }

    if(loading) return <p>Loading...</p>
    if(!task) return <p>Task not found..!</p>

    return (
        <div className="p-4 max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold">{task.title}</h1>
          <p className="mt-2"><strong>Status:</strong> {task.status}</p>
          <p className="mt-2"><strong>Priority:</strong> {task.priority}</p>
          <p className="mt-2"><strong>Description:</strong> {task.description}</p>
          <p className="mt-2"><strong>Due Date:</strong> {task.dueDate}</p>
    
          <div className="flex gap-4 mt-4">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded"
              onClick={() => navigate(`/edit-task/${taskId}`)}
            >
              Edit
            </button>
    
            <button 
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      )
}