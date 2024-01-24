import { FC } from 'react'

interface chatProps {
  params: { id: string };
}

const Chat: FC<chatProps> = ({ params }: { params: { id: string } }) => {
  return <div>Chat</div>;
};

export default Chat