import React, { useEffect } from 'react';

const SalesVideoPage: React.FC = () => {
  const balance = parseFloat(localStorage.getItem('userBalance') || '0').toFixed(2);

  useEffect(() => {
    // Add preload links dynamically
    const preloadLinks = [
      { href: 'https://scripts.converteai.net/75bccf45-aa74-4896-a5f7-ff57324a2947/players/68430ccd0a4b04065a31272c/player.js', as: 'script' },
      { href: 'https://scripts.converteai.net/lib/js/smartplayer/v1/smartplayer.min.js', as: 'script' },
      { href: 'https://images.converteai.net/75bccf45-aa74-4896-a5f7-ff57324a2947/players/68430ccd0a4b04065a31272c/thumbnail.jpg', as: 'image' },
      { href: 'https://cdn.converteai.net/75bccf45-aa74-4896-a5f7-ff57324a2947/68430acb5613df3b983c775f/main.m3u8', as: 'fetch' }
    ];

    const dnsPrefetchLinks = [
      'https://cdn.converteai.net',
      'https://scripts.converteai.net',
      'https://images.converteai.net',
      'https://api.vturb.com.br'
    ];

    // Add prerender link
    const prerenderLink = document.createElement('link');
    prerenderLink.rel = 'prerender';
    prerenderLink.href = 'https://scripts.converteai.net/75bccf45-aa74-4896-a5f7-ff57324a2947/players/68430ccd0a4b04065a31272c/embed.html';
    document.head.appendChild(prerenderLink);

    preloadLinks.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    });

    dnsPrefetchLinks.forEach((href) => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      document.head.appendChild(link);
    });

    return () => {
      // Cleanup preload links on component unmount
      const links = document.head.querySelectorAll('link[rel="preload"], link[rel="dns-prefetch"], link[rel="prerender"]');
      links.forEach(link => link.remove());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white p-6">
      <div className="max-w-md mx-auto">
        {/* Header with balance */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="bg-[#282828] rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Available Balance (US$):</span>
              <span className="text-[#1DB954] font-bold">US${balance}</span>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <p className="text-yellow-500 text-sm">
          Only a few minutes left to withdraw the balance you earned from your responses. ✅
                    </p>
        </div>

        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-3">
          Watch this video to learn how to make money with this tool. ⬇️

          </h1>
          <p className="text-gray-400">
          Watch this video to learn how to make money with this tool. ⬇️

          </p>
        </div>

        {/* Video Player */}
        <div id="ifr_68430ccd0a4b04065a31272c_wrapper" style={{ margin: '0 auto', width: '100%' }}>
          <div style={{ padding: '56.25% 0 0 0', position: 'relative' }} id="ifr_68430ccd0a4b04065a31272c_aspect">
            <iframe 
              frameBorder="0" 
              allowFullScreen 
              src="https://scripts.converteai.net/75bccf45-aa74-4896-a5f7-ff57324a2947/players/68430ccd0a4b04065a31272c/embed.html" 
              id="ifr_68430ccd0a4b04065a31272c" 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              referrerPolicy="origin"
            />
          </div>
        </div>
        <script 
          type="text/javascript" 
          dangerouslySetInnerHTML={{
            __html: `
              var s=document.createElement("script");
              s.src="https://scripts.converteai.net/lib/js/smartplayer/v1/sdk.min.js",
              s.setAttribute("data-id", "68430ccd0a4b04065a31272c"),
              s.async=!0,document.head.appendChild(s);
            `
          }}
        />
      </div>
    </div>
  );
};

export default SalesVideoPage;