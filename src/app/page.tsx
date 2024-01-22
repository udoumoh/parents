import { FC } from 'react'
import { redirect } from 'next/navigation'

interface homeProps {
  
}

const Home: FC<homeProps> = ({}) => {
  redirect('/dashboard/overview')
}

export default Home;