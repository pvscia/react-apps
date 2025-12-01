import { useEffect, useState } from "react";
import { workoutProgram } from "../utils";
import WorkoutCard from "./WorkoutCard";

export default function Grid() {
    const [savedWorkouts, setSavedWorkouts] = useState(null)
    const [selectedWorkout, setSelectedWorkout] = useState(null)
    const completedWorkouts = Object.keys(savedWorkouts || {}).filter((val) => {
        const entry = savedWorkouts[val]
        return entry.isComplete
    })

    function handleSave(index, data) {
        // save to local storage
        const newObj = {
            ...savedWorkouts,
            [index]: { ...data },
            isComplete: !!data.isComplete || !!savedWorkouts?.[index]?.isComplete
        }
        setSavedWorkouts(newObj)
        localStorage.setItem('brogram', JSON.stringify(newObj))
        setSelectedWorkout(null)
    }

    function handleComplete(index, data) {
        // complete a workout (modify completed status)
        const newObj = { ...data }
        newObj.isComplete = true;
        handleSave(index, newObj)
    }

    useEffect(() => {
        if (!localStorage) { return }
        let savedData = {}
        if (localStorage.getItem('brogram')) {
            savedData = JSON.parse(localStorage.getItem('brogram'))
        }
        setSavedWorkouts(savedData)
    }, [])

    return (
        <div className="training-plan-grid">
            {Object.keys(workoutProgram).map((workout, workoutIndex) => {
                const type = workoutIndex % 3 === 0 ? 'Push' : workoutIndex % 3 === 1 ? 'Pull' : 'Legs'

                const trainingPlan = workoutProgram[workoutIndex]

                const dayNum = ((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : (workoutIndex + 1)
                const icon = workoutIndex % 3 === 0 ? (
                    <i className="fa-solid fa-dumbbell"></i>
                ) : workoutIndex % 3 === 1 ? (
                    <i className="fa-solid fa-weight-hanging"></i>
                ) : (
                    <i className="fa-solid fa-bolt"></i>
                )


                if (workoutIndex == selectedWorkout) {
                    return (
                        <WorkoutCard key={workoutIndex}
                            trainingPlan={trainingPlan}
                            workoutIndex={workoutIndex}
                            type={type} icon={icon}
                            dayNum={dayNum}
                            handleComplete={handleComplete}
                            handleSave={handleSave}
                            savedWeights={savedWorkouts?.[workoutIndex]?.weights} 
                            isCompleted = {savedWorkouts?.[workoutIndex]?.isComplete}/>
                    )
                }

                const isLocked = (workoutIndex === 0 ? false :
                    !completedWorkouts.includes(`${workoutIndex - 1}`)
                )

                return (
                    <button key={workoutIndex} className={'card plan-card ' + (savedWorkouts ? ' inactive ' : '')} onClick={() => {
                        if(isLocked)return
                        setSelectedWorkout(workoutIndex)
                    }}>
                        <div className="plan-card-header">
                            <p>Day {dayNum}</p>
                            {isLocked ? (
                                <i className="fa-solid fa-lock"></i>
                            ) : (
                                icon
                            )}
                        </div>
                        <div className="plan-card-header">
                            <h4><b>{type}</b></h4>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}