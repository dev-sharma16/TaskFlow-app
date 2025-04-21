import React from "react";
import {Container, TaskForm} from "../components"

export default function AddTasks(){
    return(
        <section className="min-h-screen bg-gray-50 py-10 px-4">
      <Container>
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl mx-auto border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Add a New Task
          </h2>
          <TaskForm />
        </div>
      </Container>
    </section>
    )
}