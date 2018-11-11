# grabme

How to install:

```sh
$ yarn
$ npm install -g migrate-mongo
$ migrate-mongo up
```

How to run:
```sh
$ node index.js
```

### End-points

| Method | Route | Parameters | Description |
| ------ | ------ | ------ | ------ |
| GET | /articles | | Get full list of articles |
| POST | /articles | user_name, instances | Buy/scan instances into basket |
| GET | /boughts | user_name | Get list of all boughts |
| GET | /boughts/:id | user_name | Get bought by id |

### Results

GET /articles

Response body:

```json
{
    "articles": [
        {
            "instances": [
                "5be8609a1324ddcf05491057",
                "5be8609a1324ddcf05491058",
                "5be8609a1324ddcf05491059",
                "5be8609a1324ddcf0549105a"
            ],
            "_id": "5be8609aef6138cf05f29fb9",
            "name": "pencil",
            "price": 0.92
        },
        {
            "instances": [
                "5be8609a1324ddcf0549105b",
                "5be8609a1324ddcf0549105c",
                "5be8609a1324ddcf0549105d",
                "5be8609a1324ddcf0549105e",
                "5be8609a1324ddcf0549105f"
            ],
            "_id": "5be8609aef6138cf05f29fba",
            "name": "book",
            "price": 10.13
        },
        {
            "instances": [
                "5be8609a1324ddcf05491060"
            ],
            "_id": "5be8609aef6138cf05f29fbb",
            "name": "calculator",
            "price": 23.54
        }
    ]
}
```

POST /articles

Request Body
```json
{
	"user_name": "Kirill",
	"instances": ["5be8609a1324ddcf05491058" , "5be8609a1324ddcf05491059"]
}
```

Response body:
```json
{
    "result": {
        "articles": [
            "5be8609a1324ddcf05491058",
            "5be8609a1324ddcf05491059"
        ],
        "_id": "5be88ebf0679165556717706",
        "userId": "5be86090635ee3cee77077d6",
        "__v": 0
    }
}
```

GET /boughts?user_name=Kirill
Response body:
```json
{
    "boughts": [
        {
            "id": "5be8609aef6138cf05f29fbc",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 1.84,
                    "count": 2
                },
                {
                    "id": "5be8609aef6138cf05f29fba",
                    "name": "book",
                    "price": 10.13,
                    "total": 30.39,
                    "count": 3
                },
                {
                    "id": "5be8609aef6138cf05f29fbb",
                    "name": "calculator",
                    "price": 23.54,
                    "total": 23.54,
                    "count": 1
                }
            ],
            "total": 55.77
        },
        {
            "id": "5be872a3293db6038f2743b7",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 1.84,
                    "count": 2
                },
                {
                    "id": "5be8609aef6138cf05f29fba",
                    "name": "book",
                    "price": 10.13,
                    "total": 20.26,
                    "count": 2
                }
            ],
            "total": 22.1
        },
        {
            "id": "5be87456db180d088da63f1a",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 1.84,
                    "count": 2
                },
                {
                    "id": "5be8609aef6138cf05f29fba",
                    "name": "book",
                    "price": 10.13,
                    "total": 20.26,
                    "count": 2
                }
            ],
            "total": 22.1
        },
        {
            "id": "5be88d4bc48c0d515e99e58c",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 0.92,
                    "count": 1
                }
            ],
            "total": 0.92
        },
        {
            "id": "5be88ea50679165556717705",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 0.92,
                    "count": 1
                }
            ],
            "total": 0.92
        },
        {
            "id": "5be88ebf0679165556717706",
            "articles": [
                {
                    "id": "5be8609aef6138cf05f29fb9",
                    "name": "pencil",
                    "price": 0.92,
                    "total": 1.84,
                    "count": 2
                }
            ],
            "total": 1.84
        }
    ],
    "total": 103.65
}
```

GET /boughts/5be8609aef6138cf05f29fbc?user_name=Kirill

Response body:
```json
{
    "bought": {
        "articles": [
            {
                "id": "5be8609aef6138cf05f29fb9",
                "name": "pencil",
                "price": 0.92,
                "total": 1.84,
                "count": 2
            },
            {
                "id": "5be8609aef6138cf05f29fba",
                "name": "book",
                "price": 10.13,
                "total": 30.39,
                "count": 3
            },
            {
                "id": "5be8609aef6138cf05f29fbb",
                "name": "calculator",
                "price": 23.54,
                "total": 23.54,
                "count": 1
            }
        ],
        "total": 55.77
    }
}
```
