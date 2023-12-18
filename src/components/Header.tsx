import { BiArrowBack } from "react-icons/bi";

interface HeaderProps {
  label: string
  showBackButton?: boolean
}

const Header = ({label, showBackButton}:HeaderProps) => {
  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackButton && (
          <BiArrowBack
            onClick={() => window.history.back()}
            color="white"
            size={20}
            className="
              cursor-pointer
              hover:opacity-70
              transition
              "
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
}

export default Header;
