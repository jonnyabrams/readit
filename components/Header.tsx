import Image from "next/image"

const Header = () => {
  return (
    <div>
      <div className="relative w-20 h-10">
        <Image objectFit="contain" src="/logo.jpeg" layout="fill" />
      </div>
    </div>
  )
}

export default Header