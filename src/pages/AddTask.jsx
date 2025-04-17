import React from "react";
import {Container, TaskForm} from "../components"

export default function AddTasks(){
    return(
        <div className="py-8">
            <Container>
                <TaskForm/>
            </Container>
        </div>
    )
}