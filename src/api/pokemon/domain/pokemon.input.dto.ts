import Joi from 'joi';
import Pokemon from '../../../models/pokemon';

export type PokemonInputDto = {types: Array<string>} & Pokemon;

export const schema = Joi.object({
  types: Joi.array().items(Joi.string().uuid()).min(1).max(2)
    .required(),
  name: Joi.string().min(5).required(),
  code: Joi.string().min(5).required(),
  image: Joi.string().required(),
});

export function validate(pokemon: PokemonInputDto): void {
  const validation = schema.validate(pokemon);
  if (validation.error) {
    throw validation.error;
  }
}
