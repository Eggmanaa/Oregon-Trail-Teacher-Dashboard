import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Oregon Trail Simulation - Teacher Interface'}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <style>{`
          * { font-family: 'Montserrat', sans-serif; }
          .wagon-trail { background: linear-gradient(135deg, #1a472a 0%, #2d5016 50%, #8B4513 100%); }
          .card-hover:hover { transform: translateY(-2px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
          .dice-roll { animation: roll 0.3s ease-out; }
          @keyframes roll {
            0% { transform: rotate(0deg) scale(1.2); }
            50% { transform: rotate(180deg) scale(0.8); }
            100% { transform: rotate(360deg) scale(1); }
          }
          .fade-in { animation: fadeIn 0.3s ease-in; }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .pulse { animation: pulse 2s infinite; }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
        <script>{`
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'trail-green': '#2d5016',
                  'trail-brown': '#8B4513',
                  'trail-tan': '#D2B48C',
                  'wagon-red': '#8B0000',
                  'sky-blue': '#87CEEB'
                }
              }
            }
          }
        `}</script>
      </head>
      <body class="bg-gray-100 min-h-screen">
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
