'use client';

import { useEffect, useRef, useState } from 'react';

export const metadata = {
    title: 'Trading Dashboard'
};

function TradingViewWidget({ config, height = 400 }) {
    const containerRef = useRef(null);
    const scriptAddedRef = useRef(false);

    useEffect(() => {
        if (!containerRef.current || scriptAddedRef.current) return;
        scriptAddedRef.current = true;

        const container = containerRef.current;
        container.innerHTML = '';

        const widgetDiv = document.createElement('div');
        widgetDiv.className = 'tradingview-widget-container__widget';
        container.appendChild(widgetDiv);

        const script = document.createElement('script');
        script.src = `https://s3.tradingview.com/external-embedding/embed-widget-${config.type}.js`;
        script.async = true;
        script.innerHTML = JSON.stringify(config.options);
        container.appendChild(script);

        return () => {
            scriptAddedRef.current = false;
        };
    }, []);

    return (
        <div ref={containerRef} className="tradingview-widget-container" style={{ height }} />
    );
}

const SYMBOLS = [
    { label: 'S&P 500', value: 'SPY' },
    { label: 'NASDAQ', value: 'QQQ' },
    { label: 'Bitcoin', value: 'BINANCE:BTCUSDT' },
    { label: 'Gold', value: 'XAUUSD' },
    { label: 'EUR/USD', value: 'EURUSD' },
    { label: 'Apple', value: 'AAPL' },
    { label: 'Tesla', value: 'TSLA' },
    { label: 'Nvidia', value: 'NVDA' }
];

export default function TradingPage() {
    const [activeSymbol, setActiveSymbol] = useState('BINANCE:BTCUSDT');
    const [activeTab, setActiveTab] = useState('chart');

    const tabs = [
        { id: 'chart', label: 'Live Chart & Signale' },
        { id: 'market', label: 'Marktübersicht' },
        { id: 'screener', label: 'Screener' },
        { id: 'calendar', label: 'Wirtschaftskalender' }
    ];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold mb-2">Trading Dashboard</h1>
                <p className="text-blue-200 text-sm">
                    Echtzeit-Marktdaten, technische Signale und Screener für profitable Chancen
                </p>
            </div>

            {/* Symbol Selector */}
            <div className="flex flex-wrap gap-2">
                {SYMBOLS.map((sym) => (
                    <button
                        key={sym.value}
                        onClick={() => setActiveSymbol(sym.value)}
                        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                            activeSymbol === sym.value
                                ? 'bg-green-500 text-black'
                                : 'bg-blue-800 text-white hover:bg-blue-700'
                        }`}
                    >
                        {sym.label}
                    </button>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-blue-700">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 text-sm font-medium transition-colors ${
                            activeTab === tab.id
                                ? 'border-b-2 border-green-400 text-green-400'
                                : 'text-blue-300 hover:text-white'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'chart' && (
                <div className="flex flex-col gap-4">
                    {/* Main Chart */}
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <TradingViewWidget
                            key={`chart-${activeSymbol}`}
                            height={500}
                            config={{
                                type: 'advanced-chart',
                                options: {
                                    autosize: true,
                                    symbol: activeSymbol,
                                    interval: 'D',
                                    timezone: 'Europe/Berlin',
                                    theme: 'dark',
                                    style: '1',
                                    locale: 'de_DE',
                                    allow_symbol_change: true,
                                    studies: [
                                        'STD;RSI',
                                        'STD;MACD',
                                        'STD;Bollinger_Bands',
                                        'STD;Volume'
                                    ],
                                    support_host: 'https://www.tradingview.com'
                                }
                            }}
                        />
                    </div>

                    {/* Technical Analysis Signal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-xl overflow-hidden border border-blue-700">
                            <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                                Technische Analyse — Signal
                            </div>
                            <TradingViewWidget
                                key={`ta-${activeSymbol}`}
                                height={300}
                                config={{
                                    type: 'technical-analysis',
                                    options: {
                                        interval: '1D',
                                        width: '100%',
                                        isTransparent: false,
                                        height: 300,
                                        symbol: activeSymbol,
                                        showIntervalTabs: true,
                                        locale: 'de_DE',
                                        colorTheme: 'dark'
                                    }
                                }}
                            />
                        </div>
                        <div className="rounded-xl overflow-hidden border border-blue-700">
                            <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                                Symbol Info
                            </div>
                            <TradingViewWidget
                                key={`info-${activeSymbol}`}
                                height={300}
                                config={{
                                    type: 'symbol-info',
                                    options: {
                                        symbol: activeSymbol,
                                        width: '100%',
                                        locale: 'de_DE',
                                        colorTheme: 'dark',
                                        isTransparent: false
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'market' && (
                <div className="flex flex-col gap-4">
                    {/* Market Overview */}
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                            Globale Marktübersicht — Indizes, Krypto, Forex, Rohstoffe
                        </div>
                        <TradingViewWidget
                            height={550}
                            config={{
                                type: 'market-overview',
                                options: {
                                    colorTheme: 'dark',
                                    dateRange: '12M',
                                    showChart: true,
                                    locale: 'de_DE',
                                    largeChartUrl: '',
                                    isTransparent: false,
                                    showSymbolLogo: true,
                                    showFloatingTooltip: true,
                                    width: '100%',
                                    height: 550,
                                    plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
                                    plotLineColorFalling: 'rgba(41, 98, 255, 1)',
                                    gridLineColor: 'rgba(240, 243, 250, 0)',
                                    scaleFontColor: 'rgba(219, 234, 254, 1)',
                                    belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
                                    belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
                                    belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
                                    belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
                                    symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
                                    tabs: [
                                        {
                                            title: 'Indizes',
                                            symbols: [
                                                { s: 'FOREXCOM:SPXUSD', d: 'S&P 500 Index' },
                                                { s: 'FOREXCOM:NSXUSD', d: 'US 100 Cash CFD' },
                                                { s: 'FX_IDC:XAUUSD', d: 'Gold' },
                                                { s: 'BMFBOVESPA:IBX50', d: 'Brazil IBX 50' },
                                                { s: 'CAPITALCOM:RTY', d: 'Russell 2000' },
                                                { s: 'CME_MINI:NQ1!', d: 'Nasdaq' }
                                            ]
                                        },
                                        {
                                            title: 'Krypto',
                                            symbols: [
                                                { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
                                                { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
                                                { s: 'BINANCE:SOLUSDT', d: 'Solana' },
                                                { s: 'BINANCE:BNBUSDT', d: 'BNB' },
                                                { s: 'BINANCE:XRPUSDT', d: 'XRP' },
                                                { s: 'BINANCE:DOGEUSDT', d: 'Dogecoin' }
                                            ]
                                        },
                                        {
                                            title: 'Forex',
                                            symbols: [
                                                { s: 'FX:EURUSD', d: 'EUR/USD' },
                                                { s: 'FX:GBPUSD', d: 'GBP/USD' },
                                                { s: 'FX:USDJPY', d: 'USD/JPY' },
                                                { s: 'FX:USDCHF', d: 'USD/CHF' },
                                                { s: 'FX:AUDUSD', d: 'AUD/USD' },
                                                { s: 'FX:USDCAD', d: 'USD/CAD' }
                                            ]
                                        },
                                        {
                                            title: 'Rohstoffe',
                                            symbols: [
                                                { s: 'CME_MINI:GC1!', d: 'Gold' },
                                                { s: 'CME:SI1!', d: 'Silber' },
                                                { s: 'NYMEX:CL1!', d: 'Rohöl WTI' },
                                                { s: 'NYMEX:NG1!', d: 'Erdgas' },
                                                { s: 'CBOT:ZW1!', d: 'Weizen' },
                                                { s: 'CBOT:ZC1!', d: 'Mais' }
                                            ]
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>

                    {/* Ticker Tape */}
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <TradingViewWidget
                            height={80}
                            config={{
                                type: 'ticker-tape',
                                options: {
                                    symbols: [
                                        { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
                                        { proName: 'FOREXCOM:NSXUSD', title: 'Nasdaq' },
                                        { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
                                        { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
                                        { proName: 'FX:EURUSD', title: 'EUR/USD' },
                                        { proName: 'FX_IDC:XAUUSD', title: 'Gold' },
                                        { proName: 'NASDAQ:NVDA', title: 'NVDA' },
                                        { proName: 'NASDAQ:TSLA', title: 'TSLA' }
                                    ],
                                    showSymbolLogo: true,
                                    isTransparent: false,
                                    displayMode: 'adaptive',
                                    colorTheme: 'dark',
                                    locale: 'de_DE'
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'screener' && (
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                            Aktien-Screener — Beste Chancen nach technischer Analyse
                        </div>
                        <TradingViewWidget
                            height={550}
                            config={{
                                type: 'screener',
                                options: {
                                    width: '100%',
                                    height: 550,
                                    defaultColumn: 'overview',
                                    defaultScreen: 'most_capitalized',
                                    market: 'america',
                                    showToolbar: true,
                                    colorTheme: 'dark',
                                    locale: 'de_DE',
                                    isTransparent: false
                                }
                            }}
                        />
                    </div>
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                            Krypto-Screener
                        </div>
                        <TradingViewWidget
                            height={500}
                            config={{
                                type: 'screener',
                                options: {
                                    width: '100%',
                                    height: 500,
                                    defaultColumn: 'overview',
                                    defaultScreen: 'general',
                                    market: 'crypto',
                                    showToolbar: true,
                                    colorTheme: 'dark',
                                    locale: 'de_DE',
                                    isTransparent: false
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {activeTab === 'calendar' && (
                <div className="flex flex-col gap-4">
                    <div className="rounded-xl overflow-hidden border border-blue-700">
                        <div className="bg-blue-800 px-4 py-2 text-sm font-semibold">
                            Wirtschaftskalender — Marktbewegende Ereignisse
                        </div>
                        <TradingViewWidget
                            height={600}
                            config={{
                                type: 'events',
                                options: {
                                    colorTheme: 'dark',
                                    isTransparent: false,
                                    width: '100%',
                                    height: 600,
                                    locale: 'de_DE',
                                    importanceFilter: '-1,0,1',
                                    countryFilter: 'us,eu,de,gb,jp,cn,ca,au'
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Disclaimer */}
            <div className="text-xs text-blue-400 border-t border-blue-800 pt-4">
                Alle Daten von TradingView. Keine Anlageberatung. Trading birgt erhebliche Risiken.
                Vergangene Performance ist kein Indikator für zukünftige Ergebnisse.
            </div>
        </div>
    );
}
