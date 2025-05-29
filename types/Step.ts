import { Step } from '@/generated/prisma';

export type StepForm = Omit<Step, 'id' | 'recipeId'>;

export type StepFormList = StepForm[];
