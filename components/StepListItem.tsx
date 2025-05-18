import { Step } from "@/types/Step";
import { getTranslations } from "next-intl/server";

export default async function StepListItem({step}:{step: Step}) {
    const t = await getTranslations('StepListItem');
    
    return (
        <div className="m-2 bg-orange-200 rounded-lg p-2 text-white">
            <h4 className="text-lg font-bold">{t('step')} {step.num}</h4>
            <p className="break-all ml-4">{step.description}</p>
        </div>
    );
}