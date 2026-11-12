
import React from 'react'
import RemoveModuleQuestion from '@/components/module-questions/module-question-table/mq-delete'
import { useParams } from 'next/navigation'

interface Params {
    [key: string]: string;
    mid: string; 
}

/**
 * Resolves the current module id from the route params and renders the
 * row-level "Remove from module" action for a code question.
 */
const QuestionRemoveHelper = ({ qid }: { qid: string }) => {
    const { mid } = useParams<Params>();
    return (
        <>
            <RemoveModuleQuestion qid={qid} mid={mid}/>
        </>
    )
}

export default QuestionRemoveHelper
