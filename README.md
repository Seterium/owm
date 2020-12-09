# OWM widget

## How to add to site

Paste below code into `<head>`
```
<link rel="stylesheet" href="https://seterium.github.io/owm/dist/app.css">
```

Paste the below code before `</body>` tag
```
<script src="https://seterium.github.io/owm/dist/app.js" defer></script>
```

Paste tag `<open-weather />` to the right place on your site and set `api-key` attribute with your api key from [openweathermap.org](https://home.openweathermap.org/api_keys)
```
<open-weather api-key="{ API_KEY }" />
```

## Development
```
npm i
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```