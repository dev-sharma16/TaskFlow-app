import React, {useCallback, useEffect} from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select} from '../index';
import appwriteService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

export default function TaskForm({task}){
    const {register , handleSubmit, formState: {errors}} = useForm({
        defaultValues: {
            title: task ?.title || "",
            description: task ?.description || "",
            status: task ?.status || "todo",
            priority: task ?.priority || "medium",
            dueDate: task ?.dueDate || ""
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const onSubmit = async(data) => {
        
        if(!userData){
            navigate("/")
            return;
        }
        
        try {
            const taskData = {
                ...data,
                userId: userData.$id,
            }
            if(task){
                await appwriteService.updateTask(task.$id, taskData)
            }
            else{
                await appwriteService.createTask(taskData)
            }
            navigate("/dashboard")
        } catch (error) {
            throw error
        }
  
    }

    if (!userData) {
        return <p className="text-center text-red-500">Please login to add or edit tasks.</p>;
    }

    return(
        <form 
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          {/* Title */}
          <Input
            label="Title"
            placeholder = "Enter Task"
            {...register("title",{required: "Title is required"})}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("description", { required: "Description is required" })}
              rows="4"
              className="px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50     duration-200 border border-gray-300 w-full"
              placeholder="Enter task description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>
          
          {/* Status */}
          <Select
            label="Status"
            options={["todo", "inProgress", "done"]}
            {...register("status", { required: true })}
          />
          
          {/* Priority */}
          <Select
            label="Priority"
            options={["low", "medium", "high"]}
            {...register("priority", { required: true })}
          />
    
          {/* Due Date */}
          <Input
            label="Due Date"
            type="date"
            {...register("dueDate", { required: "Due date is required" })}
          />
          {errors.dueDate && (
            <p className="text-red-500">{errors.dueDate.message}</p>
          )}

          <Button
            type="submit"
            bgColor={task ? "bg-green-500" : undefined}
            className="w-full"
          >
            {task ? "Update" : "Submit"}
          </Button>

        </form>
    )
}