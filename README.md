# App store reviews API

An API to grab Apple App store reviews from an RSS feed & Android Playstore reviews directly from the UI. The reviews are able to be filter via rating, before date, and after date.

## Get Requests

To get ALL reviews - The following iOS endpoint is in this format:
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/iOS/APPID
```

or Android: 
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/Android/APPID
```

The APPID for iOS can be found via the Apple app store:
![iOS APP ID](/public/iOS-ID.png?raw=true "iOS APP ID")

And the APPID for Android can be found in the Playstore:
![Android APP ID](/public/Android-ID.png?raw=true "Android APP ID")

## Filter Paramater Examples

Filter by rating:
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/iOS/APPID?rating=1
```

Filter by afterDate:
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/iOS/APPID?afterDate=05/15/2023
```

Filter by beforeDate:
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/iOS/APPID?beforeDate=05/15/2023
```

Filter by multiple filters:
```bash
https://app-store-reviews-api-aeb965d6e5af.herokuapp.com/reviews/iOS/APPID?rating=1&beforeDate=05/15/2023
```
## Postman Collection Download

[Download here](https://github.com/Zagorouiko/Skrapr/blob/master/public/AppReviewsAPICollection.json) and import into Postman

## Donations

<div align="center">Any donations are much appreciated :pray: <br/>
![Static Badge](https://img.shields.io/badge/BTC-15DDxy651B9zQhwJXgvBg2JJH4CwcT9FUd-gold) <br/>
![Static Badge](https://img.shields.io/badge/ETH-0x2f5a2bf358f8b8e0d1e277d2d6941903319d7534-blue) <br/>
![Static Badge](https://img.shields.io/badge/SOL-APfVsqRoJoa9MVGptV8HHb1ZsMfQZ6AyKPTHs8BLnFHT-purple)<br/>
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/Zagorouiko)
</div>

