'use client';

import { Jobs } from '@/schemas/jobsSchema';
import { createContext, useContext } from 'react';

type JobsContextType = {
    jobs?: Jobs;
};

const JobsContext = createContext<JobsContextType>({});

export const useJobs = () => useContext(JobsContext);

export function JobsProvider({ children, jobs }: { children: React.ReactNode; jobs?: Jobs }) {
    return <JobsContext.Provider value={{ jobs }}>
        {children}
    </JobsContext.Provider>;
}
