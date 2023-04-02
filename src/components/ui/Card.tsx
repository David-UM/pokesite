import Image from "next/image";
import { useRouter } from "next/router";

interface CardProps {
  nombre: string;
  numero?: number;
  imgurl: string;
}

export function Card({ nombre, numero, imgurl }: CardProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`pokemon/${nombre}`);
  };

  return (
    <>
      <div
        onClick={onClick}
        className="flex flex-col w-40 p-4 m-0 box-border justify-between bg-yellow-600 gap-3 rounded-lg items-center hover:bg-yellow-500 transition duration-300 cursor-pointer"
      >
        <div className="flex justify-center h-full">
          <Image
            src={imgurl}
            alt={`Imagen de ${nombre}`}
            width={80}
            height={80}
          />
        </div>

        <span className="flex flex-row text-white justify-center  p-1 rounded-lg items-center w-full">
          <h2 className="text-base">{nombre.toLocaleUpperCase("en-US")}</h2>
        </span>
      </div>
    </>
  );
}
