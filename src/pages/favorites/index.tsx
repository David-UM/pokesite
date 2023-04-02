import { Layout } from "@/components/layouts";
import { Card, NoFavorites } from "@/components/ui";
import { localFavorites } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShortPokemon } from "../../interfaces/pokemon-full";

const Favorites = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<ShortPokemon[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons());
  }, []);

  return (
    <Layout>
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <>
          <section className="flex flex-wrap justify-center gap-2 py-6">
            {favoritePokemons.map((obj, i) => (
              <Card
                key={obj.PokeId}
                nombre={obj.name}
                numero={obj.PokeId}
                imgurl={obj.PokeImg || ""}
              />
            ))}
          </section>
        </>
      )}
    </Layout>
  );
};

export default Favorites;
