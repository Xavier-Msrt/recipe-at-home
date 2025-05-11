import { Step } from "@/types/Step";
import { Dispatch, SetStateAction } from "react";
import Input from "../Input";
import Button from "../Button";

export default function FormStep(
    {
        steps,
        setSteps
    }: {
        steps: Step[]
        setSteps: Dispatch<SetStateAction<Step[]>>;
    }
) {

    const handleStepChange = (index: number, key: keyof Step, value: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index] = {
            ...updatedSteps[index],
            [key]: value
        };
        setSteps(updatedSteps);
    };

    const handleAddStep = () => {
        const originalSteps = steps;
        originalSteps.push({
            id: steps.length + 1,
            description: ""
        });
        setSteps(originalSteps);
    }


    return (
        <>
            <h3 className="text-xl font-bold">Etapes</h3>
            <div className="ml-4">
                {steps.map((v, index) => {
                    return (
                        <div key={v.id}>
                            <Input type="text" label="Description" setValue={v => handleStepChange(index, "description", v)} />
                        </div>
                    )
                })}
            </div>
            <div className="flex justify-end">
                <Button 
                    text="Ajouter une étape" 
                    handle={handleAddStep}/>
            </div>
        </>
    )
}