// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json(
    {
      "name": "Next PWA demo",
      "short_name": "Next PWA",
      "icons": [
        {
          "src": "/favicon.ico",
          "sizes": "192x192",
          "type": "image/png"
        },

        {
          "src": "/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        }
      ],
      "theme_color": "#FFFFFF",
      "background_color": "#FFFFFF",
      "start_url": "/menu/restaurant-1",
      "display": "standalone",
      "orientation": "portrait"
    }
  )
}
