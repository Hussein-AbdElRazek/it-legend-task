import { queryOptions, useQuery } from '@tanstack/react-query';

// import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Quiz } from '@/types/api';

export const getQuiz = async ({
    courseId,
    quizId,
}: {
    courseId: string;
    quizId: string;
}): Promise<{ data: Quiz }> =>
{
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // in real api will be /quizzes/${courseId}/${quizId}
    // mock data for now
    if (courseId && quizId)
    {
        return {
            data: {
                id: quizId,
                courseId,
                title: 'Quiz: Test Your Knowledge',
                totalTimeSeconds: 600,
                createdAt: Date.now(),
                questions: [
                    {
                        id: '1',
                        question: 'What is the capital of India?',
                        options: ['Mumbai', 'New Delhi', 'Bangalore', 'Kolkata'],
                    },
                    {
                        id: '2',
                        question: 'Which river is considered the holiest in India?',
                        options: ['Yamuna', 'Ganges', 'Brahmaputra', 'Godavari'],
                    },
                    {
                        id: '3',
                        question: 'Who was the first Prime Minister of India?',
                        options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Indira Gandhi', 'Rajiv Gandhi'],
                    },
                    {
                        id: '4',
                        question: "What is the capital of Himachal Pradesh?",
                        options: ["Shimla", "Dharamshala", "Kullu", "Manali"],
                    },
                    {
                        id: '5',
                        question: "Which Indian state has the longest coastline?",
                        options: ["Tamil Nadu", "Maharashtra", "Gujarat", "Andhra Pradesh"],
                    },
                    {
                        id: '6',
                        question: "Which Indian city is known as the 'Pink City'?",
                        options: ["Jaipur", "Jodhpur", "Udaipur", "Jaisalmer"]
                    },
                    {
                        id: '7',
                        question: "What is the national animal of India?",
                        options: ["Asiatic Lion", "Bengal Tiger", "Indian Elephant", "Indian Rhinoceros"]
                    },
                    {
                        id: '8',
                        question: "Which Indian state is known as 'God's Own Country'?",
                        options: ["Kerala", "Karnataka", "Tamil Nadu", "Goa"]
                    },
                    {
                        id: '9',
                        question: "The famous 'Kumbh Mela' is held in how many different locations in India?",
                        options: ["2", "3", "4", "5"]
                    },
                    {
                        id: '10',
                        question: "Which Indian monument is one of the Seven Wonders of the World?",
                        options: ["Red Fort", "Taj Mahal", "Qutub Minar", "India Gate"]
                    }
                ]
            }
        };
    }
    throw new Error('Missing courseId or quizId');
};

export const getQuizQueryOptions = (courseId: string, quizId: string) =>
{
    return queryOptions({
        queryKey: ['quiz', courseId, quizId],
        queryFn: () => getQuiz({ courseId, quizId }),
    });
};

type UseQuizOptions = {
    params: {
        courseId: string;
        quizId: string;
    };
    queryConfig?: QueryConfig<{ data: Quiz }>;
};

export const useQuiz = ({
    params,
    queryConfig,
}: UseQuizOptions) =>
{
    return useQuery({
        ...getQuizQueryOptions(params.courseId, params.quizId),
        ...queryConfig,
    });
};

