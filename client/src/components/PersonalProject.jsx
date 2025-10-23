import { FolderIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const PersonalProject = ({data, onChange }) => {
    console.log(data)
    
    const addProject = () => {
        const newProject = {
            description: "",
            name:"",
            type:"",
        };
        onChange([...data,newProject])
    }
    const removeProject = (index)=>{
        const updated = data.filter((_,i)=> i !== index)
        onChange(updated)
    }
    const updateProject = (index,field,value)=>{
        const updated = [...data]
        updated[index] = {...updated[index],[field]:value}
        onChange(updated)
    }
    return (
        <div className='w-full flex flex-col mt-4 mb-2 '>

            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Projects

                    </p>
                    <p className="text-sm text-gray-500">Add your projects</p>
                </div>
                <button
                    onClick={addProject}
                    className="border border-transparent rounded cursor-pointer py-1 px-3 flex items-center gap-2 justify-center text-sm transition-colors duration-300 bg-green-300/30 text-green-500 hover:border-green-600"
                >
                    <Plus className="size-4" />
                    Add Projects
                </button>
            </div>


            {data.length > 0 ? (
                <div className="w-full flex flex-col my-2">
                     {data.map((itm, index) => (
                        <div
                            key={index}
                            className="my-4 w-full flex flex-col gap-4 rounded-lg border border-gray-300 py-4 px-4"
                        >
                            <div className="flex justify-between items-center ">
                                <p className="font-medium">Education #{index + 1}</p>
                                <button
                                    onClick={() => removeProject(index)}
                                    className="text-red-500 text-xs hover:underline"
                                >
                                    <Trash2 className='size-4 cursor-pointer hover:scale-103' />
                                </button>
                            </div>
                            {/*-------------- 1rd Row ------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                required
                                    value={itm.name}
                                    onChange={(e) => updateProject(index, "name", e.target.value)}
                                    placeholder="Project Name"
                                    className="text-sm w-[100%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                            </div>
                            {/*-------------- 2rd Row ------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                required
                                    value={itm.type}
                                    onChange={(e) => updateProject(index, "type", e.target.value)}
                                    placeholder="Project Type"
                                    className="text-sm w-[100%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                            </div>
                            
                            
                            {/*-------------- 3rd Row ------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                required
                                    value={itm.description}
                                    onChange={(e) => updateProject(index, "description", e.target.value)}
                                    placeholder="Describe your project..."
                                    className="text-sm w-[100%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                            </div>
                           
                        </div>
                    ))}

                </div>
            ):(
                 <div className="w-full flex flex-col items-center justify-center py-10"
                >
                    <FolderIcon className='h-auto size-15 my-2 text-gray-300' />
                    <p className='text-center text-sm text-gray-400'>No education added yet.<br></br>Click "Add Education" to get started.</p>
                </div>
            )}

        </div>
    )
}

export default PersonalProject