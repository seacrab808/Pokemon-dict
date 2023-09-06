export const fetchPokemon = async () => {
  return new Promise(async (resolve, reject) => {
    const arrPokemon = [];

    const fetchNums = 150;
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${fetchNums}`;

    // species 한국어 이름, 종, 설명
    const urls = []; // species api 포켓몬별 url
    const koreanNames = []; // 포켓몬 한국어 이름
    const genus = []; // 포켓몬 종
    const flavorText = []; // 포켓몬 짧은 요약
    const types = []; // 포켓몬 타입

    for (let i = 0; i < fetchNums; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`;
      urls.push(url);
    }

    let requests = urls.map((url) => fetch(url));

    // 비동기 작업을 여기서 기다림
    await Promise.all(requests)
      .then((responses) =>
        Promise.all(responses.map((res) => res.json())).then((results) => {
          for (let result of results) {
            if (result.egg_groups[1]) {
              types.push([
                result.egg_groups[0].name,
                result.egg_groups[1].name,
              ]);
            } else {
              types.push(result.egg_groups[0].name);
            }
            koreanNames.push(result.names[2].name);
            genus.push(result.genera[1].genus);
            flavorText.push(result.flavor_text_entries[23].flavor_text);
          }
        })
      )
      .catch((error) => {
        console.error("오류 발생:", error);
        reject(error); // 실패 시 reject 호출
      });

    // 개별 포켓몬 정보를 가져오는 함수
    const fetchIndividualPokemon = async (index) => {
      const individualUrl = `https://pokeapi.co/api/v2/pokemon/${index + 1}`;
      const individualRes = await fetch(individualUrl);
      const individualData = await individualRes.json();
      return {
        height: individualData.height,
        weight: individualData.weight,
      };
    };

    // 개별 포켓몬 정보를 가져오는 비동기 작업을 수행하고 기다림
    const individualPokemonData = await Promise.all(
      Array.from({ length: fetchNums }, (_, index) =>
        fetchIndividualPokemon(index)
      )
    );

    // 데이터를 사용하는 부분
    const res = await fetch(url);
    const data = await res.json();

    const loadedPokemon = data.results.map((pokemon, index) => {
      return {
        name: koreanNames[index],
        id: index + 1,
        gif: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${
          index + 1
        }.gif`,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
        genera: genus[index],
        text: flavorText[index],
        type: types[index],
        height: individualPokemonData[index].height,
        weight: individualPokemonData[index].weight,
      };
    });

    arrPokemon.push(...loadedPokemon);

    resolve(arrPokemon); // 비동기 작업이 완료되면 resolve 호출
  });
};
