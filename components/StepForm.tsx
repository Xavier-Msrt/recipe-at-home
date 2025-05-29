import { StepForm, StepFormList } from '@/types/Step';
import { useTranslations } from 'next-intl';

export default function StepForm({
    steps,
    setSteps,
}: {
    steps: StepFormList;
    setSteps: React.Dispatch<React.SetStateAction<StepFormList>>;
}) {
    const t = useTranslations('StepFrom');

    const handleAddStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const lastNum = steps[steps.length - 1].num;
        setSteps([...steps, { num: lastNum + 1, description: '' }]);
    };

    const handleFieldChange = (
        index: number,
        field: keyof StepForm,
        value: string | number
    ) => {
        setSteps(
            steps.map((step, i) =>
                index === i ? { ...step, [field]: value } : step
            )
        );
    };

    const handleRemoveStep = (
        e: React.MouseEvent<React.SetStateAction<HTMLButtonElement>>,
        index: number
    ) => {
        e.preventDefault();
        setSteps(
            steps
                .filter((_, i) => i !== index)
                .map((step, idx) => ({
                    ...step,
                    num: idx + 1,
                }))
        );
    };

    return (
        <>
            {steps.map((step: StepForm, index: number) => {
                return (
                    <fieldset key={index} className="fieldset">
                        <legend className="fieldset-legend">
                            {t('step') + ' ' + step.num}
                        </legend>

                        <div className="flex items-start gap-2">
                            <textarea
                                className="textarea w-full validator"
                                placeholder={t('step-placeholder')}
                                value={step.description}
                                onChange={(e) =>
                                    handleFieldChange(
                                        index,
                                        'description',
                                        e.target.value
                                    )
                                }
                                required
                            ></textarea>
                            {index !== 0 && (
                                <button
                                    className="btn btn-error p-4"
                                    onClick={(e) => handleRemoveStep(e, index)}
                                >
                                    −
                                </button>
                            )}
                        </div>
                    </fieldset>
                );
            })}

            <div className="flex justify-end my-4">
                <button
                    className="btn btn-active"
                    onClick={(e) => handleAddStep(e)}
                >
                    {t('add-step-btn')}
                </button>
            </div>
        </>
    );
}
