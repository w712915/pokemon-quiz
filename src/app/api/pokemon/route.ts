import { NextResponse } from "next/server";

const POKEMON_API = "https://pokeapi.co/api/v2";

export async function GET() {
  try {
    // ランダムなポケモンIDを生成（第1世代のみ：1-151）
    const randomIds = new Set<number>();
    while (randomIds.size < 4) {
      randomIds.add(Math.floor(Math.random() * 151) + 1);
    }

    // ポケモンデータと種の詳細（日本語名を含む）を取得
    const pokemonPromises = Array.from(randomIds).map(async (id) => {
      const [pokemonData, speciesData] = await Promise.all([
        fetch(`${POKEMON_API}/pokemon/${id}`).then((res) => res.json()),
        fetch(`${POKEMON_API}/pokemon-species/${id}`).then((res) => res.json()),
      ]);

      // 日本語の名前を取得
      const japaneseName = speciesData.names.find(
        (name: { language: { name: string } }) => name.language.name === "ja"
      ).name;

      return { ...pokemonData, japaneseName };
    });

    const pokemons = await Promise.all(pokemonPromises);

    // クイズの問題を作成
    const correctPokemon = pokemons[0];
    const choices = pokemons.map((p) => p.japaneseName);

    return NextResponse.json({
      pokemon: {
        id: correctPokemon.id,
        name: correctPokemon.japaneseName, // 日本語名を使用
        // sprites: correctPokemon.sprites,
        sprites: {
          front_default:
            correctPokemon.sprites.other["official-artwork"].front_default ||
            correctPokemon.sprites.front_default,
        },
      },
      choices: shuffleArray(choices),
      correctAnswer: correctPokemon.japaneseName, // 日本語名を使用
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch Pokemon data" },
      { status: 500 }
    );
  }
}

// 配列をシャッフルするヘルパー関数
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
