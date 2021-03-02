# Project: Pkm
# Collection: Pokemons 


## End-point: Get
### Description: Get all pokemons on list (preset on from+size) with filters (name and type)
Method: GET
>```
>/rest/pokemons
>```

### query params

| param | type    | example value |
| ----- | ------- | ------------- |
| name  | string? | macho         |
| type  | string? | fighting      |
| size  | number? | 1             |
| from  | number? | 1             |



⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get By Id
### Description: Get a pokemon by its UUID
Method: GET
>```
>/rest/pokemons/:id
>```

### Params

| Param | type   | example value                        |
| ----- | ------ | ------------------------------------ |
| id    | uuidv4 | 00000000-0000-0000-0000-000000000000 |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

# Collection: Teams 


## End-point: Get
### Description: Get all the teams
Method: GET
>```
>/rest/teams
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Get By Id
### Description: Get a team by its UUID
Method: GET
>```
>/rest/teams/:id
>```

### Params

| Param | type   | example value                        |
| ----- | ------ | ------------------------------------ |
| id    | uuidv4 | 00000000-0000-0000-0000-000000000000 |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Save
### Description: Save a new team based on its pokemons, trainer and team name
Method: POST
>```
>/rest/teams
>```
### Body (**raw**)

```json
{
    "pokemons": ["9d34ff99-c612-4d15-b040-3055eb7888dc"],
    "name": "The Best",
    "trainer_name":"Xyah The Convicted Man"
}
```

| param        | type       | example value                            |
| ------------ | ---------- | ---------------------------------------- |
| pokemons     | uuidv4[]   | ["00000000-0000-0000-0000-000000000000"] |
| name         | string(5,) | The Best                                 |
| trainer_name | string(5,) | Ruan Gato                                |


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Update
### Description: Update a team by its uuid and new payload data
Method: PUT
>```
>/rest/teams/:id
>```


### Params

| Param | type   | example value                        |
| ----- | ------ | ------------------------------------ |
| id    | uuidv4 | 00000000-0000-0000-0000-000000000000 |

### Body (**raw**)

```json
{
    "pokemons": ["9d34ff99-c612-4d15-b040-3055eb7888dc"],
    "name": "The Best",
    "trainer_name":"Xyah The Convicted Man"
}
```

| param        | type       | example value                            |
| ------------ | ---------- | ---------------------------------------- |
| pokemons     | uuidv4[]   | ["00000000-0000-0000-0000-000000000000"] |
| name         | string(5,) | The Best                                 |
| trainer_name | string(5,) | Ruan Gato                                |




⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


## End-point: Remove
### Description: Logically remove the team
Method: DELETE
>```
>/rest/teams/:id
>```

### Params

| Param | type   | example value                        |
| ----- | ------ | ------------------------------------ |
| id    | uuidv4 | 00000000-0000-0000-0000-000000000000 |

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃
