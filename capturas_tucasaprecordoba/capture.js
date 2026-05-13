const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    const pagesToCapture = [
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/index.html', name: 'inicio' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/comprar.html', name: 'comprar' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/vender.html', name: 'vender' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/exclusivas.html', name: 'exclusivas' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/lofts.html', name: 'lofts' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/tour-virtual.html', name: 'tour-virtual' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/sobre-nosotros.html', name: 'sobre-nosotros' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/blog.html', name: 'blog' },
        { url: 'http://127.0.0.1:5500/tucasaprecordoba/contacto.html', name: 'contacto' }
    ];

    for (const item of pagesToCapture) {
        try {
            console.log(`Capturando ${item.name}...`);
            await page.goto(item.url, { waitUntil: 'load', timeout: 15000 });
            
            // Wait a little bit for animations or dynamic content
            await new Promise(r => setTimeout(r, 2000));
            
            // 1. Captura de página completa
            await page.screenshot({ path: `captura_${item.name}_completa.png`, fullPage: true });
            
            // 2. Captura de pantalla inicial (viewport)
            await page.screenshot({ path: `captura_${item.name}_viewport.png`, fullPage: false });

        } catch (e) {
            console.error(`Error al capturar ${item.name}: ${e.message}`);
        }
    }
    
    await browser.close();
    console.log('Capturas finalizadas.');
})();
