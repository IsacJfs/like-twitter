import { CommentState } from '@/features/comments/commentSlice'

interface CommentItemProps {
  comment: CommentState
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return <div>{comment.conteudo}</div>
}

export default CommentItem
