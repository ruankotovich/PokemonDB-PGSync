export interface PokemonEsResponseDto {
    id: string;
    name: string;
    code: string;
    Types: { id: string; name: string }[];
}

export function toDTO(entries: Array<{_source: Partial<PokemonEsResponseDto>}>): PokemonEsResponseDto[] {
  return entries.map(({ _source }) => ({
    id: _source.id as string,
    name: _source.name as string,
    code: _source.code as string,
    Types: _source.Types as { id: string; name: string }[],
  }));
}
