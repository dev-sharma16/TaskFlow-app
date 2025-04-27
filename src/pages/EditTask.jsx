import React, { useState, useEffect } from "react"
import { Container, TaskForm } from "../components"
import service from "../appwrite/config"
import { useNavigate, useParams } from "react-router-dom"

export default function EditTask (){
    const [task,setTask] = useState(null)
    const {taskId} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        if(taskId){
            service.getTaskById(taskId).then((task)=>{
                if(task){
                    setTask(task)
                }
            })
        }
        else{
            navigate("/dashboard")
         }
    },[taskId, navigate])

    return task ? (
        <section className="min-h-screen bg-gray-50 py-10 px-4">
          <Container>
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                Edit Task
              </h2>
              <TaskForm task={task} />
            </div>
          </Container>
        </section>
      ) : (
        <p className="text-center text-xl text-gray-600">Loading...</p>
      );
}