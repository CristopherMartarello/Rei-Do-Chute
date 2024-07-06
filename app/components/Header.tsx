import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Image from "next/image";
import { useAuthContext } from "../context/AuthContext";
import { HiTrophy } from "react-icons/hi2";

const Header = () => {
    const { userAuth, logout } = useAuthContext();

    return (
        <div className="flex justify-between px-3 w-full h-20 items-center bg-zinc-950">
            {/*LOGO*/}
            <Image src={"/LogoSecundariaReiDoChute.png"} alt={"Logo Rei do Chute"} height={130} width={130} className="object-cover" />
            {/*MENU*/}
            <div className="flex items-center gap-4 p-3">
                <HiTrophy className="w-8 h-8 text-yellow-500"/>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform w-8 h-8"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">{userAuth?.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings">
                            Minha conta
                        </DropdownItem>
                        <DropdownItem key="analytics">
                            Estatísticas
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onClick={logout}>
                            Sair
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
}

export default Header;