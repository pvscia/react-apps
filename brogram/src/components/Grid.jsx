import { workoutProgram } from "../utils";

export default function Grid() {
    return (
        <div className="training-grid-plan">
            {Object.keys(workoutProgram).map((workout, workoutIndex) => {
                return (
                    <button key={workoutIndex}>
                        <div className="plan-card-header">
                            <p>Day {((workoutIndex / 8) <= 1) ? '0' + (workoutIndex + 1) : (workoutIndex + 1)}</p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}