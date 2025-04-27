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
          <div className="p-6 bg-gray-100 min-h-screen">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                  <h1 className="text-3xl font-bold text-center mb-4">{task.title}</h1>
                  <div className="space-y-4">
                    <p>
                      <strong>Status:</strong> {task.status}
                    </p>
                    <p>
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <p>
                      <strong>Description:</strong> {task.description}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {task.dueDate}
                    </p>
                  </div>
          
                  <div className="flex gap-4 mt-6 justify-center">
                    <button
                      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                      onClick={() => navigate(`/edit-task/${taskId}`)}
                    >
                      Edit
                    </button>
          
                    <button
                      className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
      )
}