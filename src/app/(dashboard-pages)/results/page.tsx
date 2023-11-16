import { FC } from 'react'
import EmptyStateCard from '@/components/shared/emptyStateCard'

interface ResultsProps {
  
}

const Results: FC<ResultsProps> = ({}) => {
  return (
    <div>
        <EmptyStateCard />
    </div>
  )
}

export default Results