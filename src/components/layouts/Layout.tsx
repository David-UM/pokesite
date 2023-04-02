import Head from "next/head";
import { Navbar } from "../ui";

interface LayourProps {
  children: React.ReactNode;
  titulo?: string;
  description?: string;
}

export const Layout = ({ children, titulo, description }: LayourProps) => {
  return (
    <>
      <Head>
        <title>{titulo || "Pokemon App"}</title>
        <meta name="author" content="David Urbano" />
        <meta name="description" content="Informacion del Pokemon XXXXX" />
        <meta name="keywords" content="XXXXX, pokemon, pokedex" />
        <meta property="og:title" content={titulo || "Pokemon App"} />
        <link
          rel="icon"
          type="image/png"
          href="https://raw.githubusercontent.com/David-UM/My-Images-Repository/main/PokemonTypes/logo/icon.png"
        />
        <meta
          property="og:description"
          content={description || "Website about pokemons"}
        />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/David-UM/My-Images-Repository/main/PokemonTypes/logo/banner.png"
        />
      </Head>
      <Navbar />
      <main className="px-5 bg-blue-900 text-white">{children}</main>
    </>
  );
};
