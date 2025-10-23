import { Plus, SparkleIcon, SparklesIcon, X } from 'lucide-react';
import React, { useState } from 'react'

const PersonalSkills = ({ data, onChange }) => {
  
    const [skills,setSkills] = useState("")

    const addSkills = () => {
        
        onChange([...data,skills])
        setSkills("")
    }
   
   

    const removeSkills = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }

    return (
        <div className="w-full flex flex-col mt-4 mb-2">
            <div className="w-full flex flex-row items-center justify-between mb-6">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
Skills
                    </p>
                    <p className="text-sm text-gray-500">
Add your technical and soft skills

                    </p>
                </div>


            </div>
            <div className="mb-2 w-full flex items-center justify-between gap-3">
                <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Enter a Skill e.g.(Javascript,Project Management etc...)"
                    className="text-sm w-[88%] border border-gray-400 rounded-lg py-2 px-2"></input>

                <button
                onClick={()=>addSkills()}
                    className='hover:bg-blue-700 cursor-pointer hover:translate-y-[-3px] transition-all duration-300 py-2 px-4 flex items-center justify-center gap-2 rounded rounded-lg text-white text-sm bg-blue-600'
                >
                    <Plus className="size-4" />
                    Add
                </button>
            </div>

            {data.length > 0?(
                <div className="my-6 w-full flex flex-wrap gap-2">
                    {data.map((itm,index)=>(
                        <div className="rounded rounded-full bg-blue-400/20 text-xs py-1 px-3 flex items-center justify-center gap-2">

                            <p>{itm}</p>
                           <div onClick={()=>removeSkills(index)} className="cursor-pointer hover:bg-blue-400/30 transition-all duration-300 rounded rounded-full w-4 h-4 flex items-center justify-center">
                             <X className='size-3'/>
                           </div>
                        </div>
                    ))}
                </div>
            ):(
                <div className="w-full flex flex-col items-center justify-center py-10"
                >
                    <SparklesIcon className='h-auto size-15 my-2 text-gray-300' />
                    <p className='text-center text-sm text-gray-400'>No skills added yet.<br></br>Add your technical and soft skills above.</p>
                </div>
            )}

            <div className="cursor-pointer mb-3 w-full flex items-center justify-start text-sm  px-2 py-3 rounded rounded-lg bg-blue-400/20 text-blue-700">
            <p ><span className='font-bold'>Tip:</span> Add 8-12 relevant skills. Include both technical skills<br></br> (programming languages, tools) and soft skills (leadership,<br></br> communication).</p>
            </div>

        </div>
    )
}

export default PersonalSkills