import { pokeApi } from "../api";
import { GetStaticProps, NextPage } from "next";
import { Layout } from "./../components/layouts";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { Card } from "@/components/ui";

interface HomeProps {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<HomeProps> = ({ pokemons }) => {
  return (
    <>
      <Layout titulo="Pokemon App">
        <div className="flex flex-wrap justify-center gap-2 py-6">
          {pokemons.map((e, i) => (
            <Card key={e.id} nombre={e.name} numero={i + 1} imgurl={e.image} />
          ))}
        </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=300");

  const newdata = await data.results.map((e, i) => {
    return {
      ...e,
      id: 1 + i,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
        i + 1
      }.svg`,
    };
  });
  return {
    props: {
      pokemons: newdata,
    },
  };
};

export default HomePage;
