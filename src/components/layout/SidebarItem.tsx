import { IconType } from 'react-icons'
import { useNavigate } from 'react-router-dom'

interface SidebarItemProps {
  label: string
  href?: string
  icon: IconType
  onClick?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (href) {
      navigate(href)
    } else if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className="flex flex-row items-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 lg:hidden">
        <Icon size={28} color="white" />
      </div>
      <div className="hidden lg:flex gap-4 p-4 rounded-full hover:bg-slate-300 hover:bg-opacity-10 items-center">
        <Icon size={28} color="white" />
        <p className="text-white text-xl">{label}</p>
      </div>
    </div>
  )
}

export default SidebarItem
