import { Transaction } from 'sequelize';
import { Client } from '@elastic/elasticsearch';
// eslint-disable-next-line import/no-unresolved
import { Query } from 'express-serve-static-core';
import config from 'config';
import PokemonRepository from '../pokemon.repository';
import Pokemon from '../../../models/pokemon';
import esClientSingleton from '../pokemon.es.client';
import buildQuery, { QueryPokemon } from '../domain/pokemon.es.querybuilder';
import { PokemonEsResponseDto, toDTO } from '../domain/pokemon.es.response.dto';

const esIndex = config.get('services.elasticsearch.index') as string;

export default class PokemonFind {
  private repository: PokemonRepository;

  private esClient: Client;

  constructor(transaction?: Transaction) {
    this.repository = new PokemonRepository(transaction);
    this.esClient = esClientSingleton;
  }

  async findAll(query?: Query): Promise<PokemonEsResponseDto[]> {
    const body = buildQuery(query as QueryPokemon);
    const response = await this.esClient.search({
      index: esIndex,
      body,
    });
    return toDTO(response.body.hits.hits);
  }

  findById(id: string): Promise<Pokemon | Pokemon[] | null> {
    return this.repository.findById(id, 'whichTypes');
  }
}
