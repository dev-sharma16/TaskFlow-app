import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components";

function Dashboard() {
  
  const [tasks, setTasks] = useState({
    low: [],
    medium: [],
    high: [],
  })
  
  const [loading,setLoading] = useState(true)
  const userData = useSelector((state)=> state.auth.userData)
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchTasks = async()=>{
      try {
        if (!userData) {
           navigate("/login")
           return
        }

        const response = await service.getTaskByUser(userData.$id)

        const grouped = {
          low:[],
          medium:[],
          high:[],
        }

        response.documents.forEach((task)=>{
          const priority = task.priority?.toLowerCase()
          if(grouped[priority]){
            grouped[priority].push(task)
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

  if (loading) return <div className="text-center mt-10 text-xl">Loading tasks...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["low", "medium", "high"].map((priority) => (
          <div key={priority} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold capitalize mb-4 text-center text-gray-700">
              {priority} Priority
            </h2>

            {tasks[priority].length > 0 ? (
              // tasks[priority].map((task) => (
              //   <div
              //     key={task.$id}
              //     className="mb-4 p-3 border border-gray-300 rounded bg-gray-50"
              //   >
              //     <h3 className="text-lg font-medium">{task.title}</h3>
              //     <p className="text-sm text-gray-600">{task.description}</p>
              //     <p className="text-xs mt-2 text-gray-500">
              //       Due: {task.dueDate || "No due date"}
              //     </p>
              //   </div>
              // ))
              tasks[priority].map((task)=>(
                 <TaskCard key={task.$id} task={task}/>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">No tasks</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
