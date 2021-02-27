import { Transaction } from 'sequelize';
import PokemonRepository from '../pokemon.repository';
import Pokemon from '../../../models/pokemon';
import { PokemonInputDto, validate } from '../domain/pokemon.input.dto';
import TypeOfPokemonSave from '../../typeOfPokemon/usecases/typeOfPokemon.save';
import TypeOfPokemon from '../../../models/type.of.pokemon';

export default class PokemonSave {
  private repository: PokemonRepository;

  private typeOfPokemonSave: TypeOfPokemonSave;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonRepository(transaction);
    this.typeOfPokemonSave = new TypeOfPokemonSave(transaction);
  }

  async save(pokemon: PokemonInputDto): Promise<Pokemon> {
    validate(pokemon);

    const savedPokemon = await this.repository.save(pokemon);

    const promises = pokemon.types.map(
      (type_id) => this.typeOfPokemonSave.save(
          { pokemon_id: savedPokemon.id as string, type_id } as TypeOfPokemon,
      ),
    );
    await Promise.all(promises);
    return pokemon;
  }
}
