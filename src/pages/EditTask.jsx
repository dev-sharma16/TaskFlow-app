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

    return task?(
        <div className="py-8">
            <Container>
                <TaskForm task = {task}/>
            </Container>
        </div>
    ) : <p>Loading...</p>
}