# Price Divider
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FZekromaster%2FPriceDivider.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FZekromaster%2FPriceDivider?ref=badge_shield)


This program uses the following format for the file containing the list of products:
```
[
  {"name": /* name of the product */, "price": /* price of the product */},
  {"name": /* name of the product */, "price": /* price of the product */},
  {"name": /* name of the product */, "price": /* price of the product */},
  {"name": /* name of the product */, "price": /* price of the product */}
]
```

And this for the file containing the list of people:
```
{
  "people": [
    {
      "name": /* name of the person */
      "products": [
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */}
      ]
    },
    {
      "name": /* name of the person */
      "products": [
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */}
      ]
    },
    {
      "name": /* name of the person */
      "products": [
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */},
        {"name": /* name of the product */, "number": /* how many they're buying */}
      ]
    }
  ],
  "shipping": /* The shipping fee */
}
```


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FZekromaster%2FPriceDivider.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2FZekromaster%2FPriceDivider?ref=badge_large)