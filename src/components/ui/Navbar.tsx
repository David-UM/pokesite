import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-between text-white p-4 bg-blue-500 font-mono text-xl">
        <div className="flex items-center">
          <span className="flex">
            <Link href={"/"}>
              <Image
                src={
                  "https://raw.githubusercontent.com/David-UM/My-Images-Repository/46bd1e5b5c3a822017f6afff32a2862a46388fc8/PokemonTypes/logo/pokemon.svg"
                }
                width={90}
                height={90}
                alt="logo"
              />
            </Link>
          </span>
        </div>

        <Link href={"/favorites"} className="hover:text-green-500">
          Favorites
        </Link>
      </div>
    </>
  );
};
