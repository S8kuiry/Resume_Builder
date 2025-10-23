import { BaggageClaim, GraduationCapIcon, Plus, Trash2 } from 'lucide-react';
import React from 'react'

const PersonalEducation = ({ data, onChange }) => {
    const addEducation = () => {
        const newEducation = {
            institution: "",
            degree: "",
            field: "",
            gpa: "",
            graduation_date: ""
        };
        onChange([...data, newEducation])
    }

    const removeEducation = (index) => {
        const updated = data.filter((_,i) => i !== index)
        onChange(updated)
    }

    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }

    

    return (
        <div className='w-full flex flex-col mt-4 mb-2 '>
            <div className="w-full flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        Education
                    </p>
                    <p className="text-sm text-gray-500">Add your education details</p>
                </div>
                <button
                    onClick={addEducation}
                    className="border border-transparent rounded cursor-pointer py-1 px-3 flex items-center gap-2 justify-center text-sm transition-colors duration-300 bg-green-300/30 text-green-500 hover:border-green-600"
                >
                    <Plus className="size-4" />
                    Add Education
                </button>
            </div>

            {data.length > 0 ? (
                <div className="w-full flex flex-col my-2 text-gray-900 ">
                    {data.map((itm, index) => (
                        <div
                            key={index}
                            className="text-gray-900  my-3 w-full flex flex-col gap-4 rounded-lg border border-gray-400 py-4 px-4"
                        >
                            <div className="flex justify-between items-center ">
                                <p className="font-medium text-gray-900">Education #{index + 1}</p>
                                <button
                                    onClick={() => removeEducation(index)}
                                    className="text-red-500 text-xs hover:underline"
                                >
                                    <Trash2 className='size-4 cursor-pointer hover:scale-103' />
                                </button>
                            </div>
                            {/*---------------------- company and position ------------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                    value={itm.institution}
                                    required
                                    onChange={(e) => updateEducation(index, "institution", e.target.value)}
                                    placeholder="Institution Name"
                                    className="text-gray-900 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                                <input
                                    value={itm.degree}
                                    required
                                    onChange={(e) => updateEducation(index, "degree", e.target.value)}
                                    placeholder="Degree or Certificate"
                                    className="text-gray-900 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                            </div>
                            {/*------------------------- 2nd row  ------------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                    value={itm.field}
                                    required
                                    onChange={(e) => updateEducation(index, "field", e.target.value)}
                                    placeholder="Field Of Study"
                                    className="text-gray-900 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                                <input
                                    type="date"
                                    required
                                    value={itm.graduation_date}
                                    onChange={(e) => updateEducation(index, "graduation_date", e.target.value)}
                                    className="text-gray-900 palceholder:text-gray-300 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                               
                            </div>
                            {/*-------------- 3rd Row ------------------ */}
                            <div className="w-full flex items-center justify-between">
                                <input
                                    value={itm.gpa}
                                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                                    placeholder="GPA or Percentage(Optional)"
                                    className="text-gray-900 text-sm w-[48%] border border-gray-400 rounded-lg py-3 px-2"
                                />
                            </div>
                           
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full flex flex-col items-center justify-center py-10"
                >
                    <GraduationCapIcon className='h-auto size-15 my-2 text-gray-300' />
                    <p className='text-center text-sm text-gray-400'>No education added yet.<br></br>Click "Add Education" to get started.</p>
                </div>
            )}

        </div>
    )
}

export default PersonalEducation