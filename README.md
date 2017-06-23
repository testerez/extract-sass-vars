Command line tool to extract variables from SCSS files.

### Setup:

`yarn global add extract-sass-vars` or `npm i -g extract-sass-vars`

### Usage:

`extract-sass-vars styles.scss`

Given this SASS file

```sass
$red: red !default;
$hexGreen: #0f0;
$size: 12px;
$lightenRed: lighten($red, 0.5);
$override: red;
$override: green;
$noOverride: green;
$noOverride: red !default;
$font: italic bold 12px/30px Georgia, serif;

$key: k;
$map: (
  a: 1,
  b: something,
  c: 'something, else',
  $key: value,
);
```

it will output

```json
{
  "$red": "red",
  "$hexGreen": "#0f0",
  "$size": "12px",
  "$lightenRed": "#ff0303",
  "$override": "green",
  "$noOverride": "green",
  "$font": "italic bold 12px/30px Georgia, serif",
  "$key": "k",
  "$map": {
    "a": 1,
    "b": "something",
    "c": "something, else",
    "k": "value"
  }
}
```
