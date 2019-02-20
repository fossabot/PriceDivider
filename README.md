# Price Divider

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
