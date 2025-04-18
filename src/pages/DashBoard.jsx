import React, { useEffect, useState } from "react";
import service from "../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TaskCard } from "../components";

function Dashboard() {
  
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: [],
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
          todo:[],
          inProgress:[],
          done:[],
        }

        response.documents.forEach((task)=>{
          const status = task.status?.toLowerCase()
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

  if (loading) return <div className="text-center mt-10 text-xl">Loading tasks...</div>;

  const statusLabels = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Completed",
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["todo", "inProgress", "done"].map((status) => (
          <div key={status} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold capitalize mb-4 text-center text-gray-700">
              {statusLabels[status]} 
            </h2>

            {tasks[status].length > 0 ? (
              tasks[status].map((task)=>(
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
