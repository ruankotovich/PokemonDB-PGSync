import Joi from 'joi';
import Team from '../../../models/team';

export const schema = Joi.object({
  pokemons: Joi.array().items(Joi.string().uuid()).min(1).max(6)
    .required(),
  name: Joi.string().min(5).required(),
  trainer_name: Joi.string().min(5).required(),
});

export type TeamInputDto = {pokemons: Array<string>} & Team;

export function validate(team: TeamInputDto): void {
  const validation = schema.validate(team);
  if (validation.error) {
    throw validation.error;
  }
}
