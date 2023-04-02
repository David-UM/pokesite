import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { localFavorites } from "@/utils";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import Image from "next/image";

import { useState, useEffect } from "react";
import { Pokemon, PokemonListResponse, ShortPokemon } from "../../interfaces";

import confetti from "canvas-confetti";

interface Props {
  pokemon: ShortPokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const [textoboton, setTextoboton] = useState("Add to Favorites");
  /* console.log(pokemon); */

  useEffect(() => {
    setIsFavorite(localFavorites.isFavorite(pokemon));
  }, [pokemon]);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon);
    setIsFavorite(!isFavorite);

    if (isFavorite) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: { x: 1, y: 0 },
    });
  };

  return (
    <>
      <Layout
        titulo={pokemon.name}
        description={`Basic stats of ${pokemon.name}`}
      >
        <div className="py-6 flex flex-col justify-center items-center gap-4 h-screen">
          <div className="bg-yellow-500 flex justify-center p-7 rounded-2xl">
            <Image
              src={pokemon.PokeImg || "/../../../public/error.png"}
              alt={pokemon.name}
              width={250}
              height={250}
            />
          </div>
          <div className="flex p-1 gap-2">
            {pokemon.ExtraData.map((e, i) => (
              <Image
                width={60}
                height={60}
                src={`https://raw.githubusercontent.com/David-UM/My-Images-Repository/main/PokemonTypes/${e.type.name}.png`}
                key={i}
                alt={"Type"}
              />
            ))}
          </div>
          <div className="text-white w-full gap-3 flex flex-col">
            <div className="flex justify-between p-1 gap-5 items-center flex-col">
              <h2 className="sm:text-4xl text-5xl">
                {pokemon.name.toLocaleUpperCase()}
              </h2>
              <button
                onClick={onToggleFavorite}
                className="bg-purple-600 p-2 rounded-md hover:bg-red-600 duration-300 transition"
              >
                {isFavorite ? "Delete from Favorites" : "Add to Favorites"}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <Image
                className=""
                src={pokemon.Simg1}
                alt={pokemon.name}
                width={120}
                height={120}
              />
              <Image
                className=""
                src={pokemon.Simg2}
                alt={pokemon.name}
                width={120}
                height={120}
              />
              <Image
                className=""
                src={pokemon.Simg3}
                alt={pokemon.name}
                width={120}
                height={120}
              />
              <Image
                className=""
                src={pokemon.Simg4}
                alt={pokemon.name}
                width={120}
                height={120}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PokemonPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  return {
    /* paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ], */
    paths: data.results.map((e) => ({ params: { id: e.name } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  const SupPoke: ShortPokemon = await {
    name: data.name,
    PokeId: data.id,
    PokeImg: data.sprites.other?.dream_world.front_default,
    Simg1: data.sprites.front_default,
    Simg2: data.sprites.back_default,
    Simg3: data.sprites.front_shiny,
    Simg4: data.sprites.back_shiny,
    ExtraData: data.types,
  };

  return {
    props: {
      pokemon: SupPoke,
    },
  };
};
