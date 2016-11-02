Usefull links
- https://github.com/garex/nodejs-color-difference
- https://github.com/markusn/color-diff
- VSCode plugin?

## API

colorsToVars(
  palette: object,
  targedFile: string
  options?: object 
)

`palette`
  object that maps variable names to value
  ```
  {
    '$red': '#f00',
    '$green': 'rgba(0, 255, 0)',
  }
  ```

`targedFile`
  path to file where colors will be swaped

`options`
```
{
  thershold: 0.8, // minimal color similarity. From 1(same) to 0(white/black)
  verbose: true,  // log all replacements
  suggest: true,  // log other matching colors
}
```