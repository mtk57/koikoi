const cards = [
    // 1月 (Matsu)
    { month: 1, type: 'hikari', name: '松に鶴', image: 'images/Fuda01_1.png' },
    { month: 1, type: 'tanzaku', name: '松に赤短', image: 'images/Fuda01_2.png' },
    { month: 1, type: 'kasu', name: '松のカス', image: 'images/Fuda01_3.png' },
    { month: 1, type: 'kasu', name: '松のカス', image: 'images/Fuda01_4.png' },
    // 2月 (Ume)
    { month: 2, type: 'tane', name: '梅に鶯', image: 'images/Fuda02_1.png' },
    { month: 2, type: 'tanzaku', name: '梅に赤短', image: 'images/Fuda02_2.png' },
    { month: 2, type: 'kasu', name: '梅のカス', image: 'images/Fuda02_3.png' },
    { month: 2, type: 'kasu', name: '梅のカス', image: 'images/Fuda02_4.png' },
    // 3月 (Sakura)
    { month: 3, type: 'hikari', name: '桜に幕', image: 'images/Fuda03_1.png' },
    { month: 3, type: 'tanzaku', name: '桜に赤短', image: 'images/Fuda03_2.png' },
    { month: 3, type: 'kasu', name: '桜のカス', image: 'images/Fuda03_3.png' },
    { month: 3, type: 'kasu', name: '桜のカス', image: 'images/Fuda03_4.png' },
    // 4月 (Fuji)
    { month: 4, type: 'tane', name: '藤に不如帰', image: 'images/Fuda04_1.png' },
    { month: 4, type: 'tanzaku', name: '藤に短冊', image: 'images/Fuda04_2.png' },
    { month: 4, type: 'kasu', name: '藤のカス', image: 'images/Fuda04_3.png' },
    { month: 4, type: 'kasu', name: '藤のカス', image: 'images/Fuda04_4.png' },
    // 5月 (Ayame)
    { month: 5, type: 'tane', name: '菖蒲に八橋', image: 'images/Fuda05_1.png' },
    { month: 5, type: 'tanzaku', name: '菖蒲に短冊', image: 'images/Fuda05_2.png' },
    { month: 5, type: 'kasu', name: '菖蒲のカス', image: 'images/Fuda05_3.png' },
    { month: 5, type: 'kasu', name: '菖蒲のカス', image: 'images/Fuda05_4.png' },
    // 6月 (Botan)
    { month: 6, type: 'tane', name: '牡丹に蝶', image: 'images/Fuda06_1.png' },
    { month: 6, type: 'tanzaku', name: '牡丹に青短', image: 'images/Fuda06_2.png' },
    { month: 6, type: 'kasu', name: '牡丹のカス', image: 'images/Fuda06_3.png' },
    { month: 6, type: 'kasu', name: '牡丹のカス', image: 'images/Fuda06_4.png' },
    // 7月 (Hagi)
    { month: 7, type: 'tane', name: '萩に猪', image: 'images/Fuda07_1.png' },
    { month: 7, type: 'tanzaku', name: '萩に短冊', image: 'images/Fuda07_2.png' },
    { month: 7, type: 'kasu', name: '萩のカス', image: 'images/Fuda07_3.png' },
    { month: 7, type: 'kasu', name: '萩のカス', image: 'images/Fuda07_4.png' },
    // 8月 (Susuki)
    { month: 8, type: 'hikari', name: '芒に月', image: 'images/Fuda08_1.png' },
    { month: 8, type: 'tane', name: '芒に雁', image: 'images/Fuda08_2.png' },
    { month: 8, type: 'kasu', name: '芒のカス', image: 'images/Fuda08_3.png' },
    { month: 8, type: 'kasu', name: '芒のカス', image: 'images/Fuda08_4.png' },
    // 9月 (Kiku)
    { month: 9, type: 'tane', name: '菊に盃', image: 'images/Fuda09_1.png' },
    { month: 9, type: 'tanzaku', name: '菊に青短', image: 'images/Fuda09_2.png' },
    { month: 9, type: 'kasu', name: '菊のカス', image: 'images/Fuda09_3.png' },
    { month: 9, type: 'kasu', name: '菊のカス', image: 'images/Fuda09_4.png' },
    // 10月 (Momiji)
    { month: 10, type: 'tane', name: '紅葉に鹿', image: 'images/Fuda10_1.png' },
    { month: 10, type: 'tanzaku', name: '紅葉に青短', image: 'images/Fuda10_2.png' },
    { month: 10, type: 'kasu', name: '紅葉のカス', image: 'images/Fuda10_3.png' },
    { month: 10, type: 'kasu', name: '紅葉のカス', image: 'images/Fuda10_4.png' },
    // 11月 (Yanagi)
    { month: 11, type: 'hikari', name: '柳に小野道風', image: 'images/Fuda11_1.png' },
    { month: 11, type: 'tane', name: '柳に燕', image: 'images/Fuda11_2.png' },
    { month: 11, type: 'tanzaku', name: '柳に短冊', image: 'images/Fuda11_3.png' },
    { month: 11, type: 'kasu', name: '柳のカス', image: 'images/Fuda11_4.png' },
    // 12月 (Kiri)
    { month: 12, type: 'hikari', name: '桐に鳳凰', image: 'images/Fuda12_1.png' },
    { month: 12, type: 'kasu', name: '桐のカス', image: 'images/Fuda12_2.png' },
    { month: 12, type: 'kasu', name: '桐のカス', image: 'images/Fuda12_3.png' },
    { month: 12, type: 'kasu', name: '桐のカス', image: 'images/Fuda12_4.png' },
];

const yaku = [
    {
        name: '五光 (Goko)',
        points: 10,
        cards: ['images/Fuda01_1.png', 'images/Fuda03_1.png', 'images/Fuda08_1.png', 'images/Fuda11_1.png', 'images/Fuda12_1.png']
    },
    {
        name: '四光 (Shiko)',
        points: 8,
        cards: ['images/Fuda01_1.png', 'images/Fuda03_1.png', 'images/Fuda08_1.png', 'images/Fuda12_1.png']
    },
    {
        name: '雨四光 (Ame-Shiko)',
        points: 7,
        cards: ['images/Fuda01_1.png', 'images/Fuda03_1.png', 'images/Fuda08_1.png', 'images/Fuda11_1.png']
    },
    {
        name: '三光 (Sanko)',
        points: 5,
        // Note: Any 3 hikari cards except for the Rain Man.
        cards: ['images/Fuda01_1.png', 'images/Fuda03_1.png', 'images/Fuda12_1.png'] 
    },
    {
        name: '花見で一杯 (Hanami-zake)',
        points: 5,
        cards: ['images/Fuda03_1.png', 'images/Fuda09_1.png']
    },
    {
        name: '月見で一杯 (Tsukimi-zake)',
        points: 5,
        cards: ['images/Fuda08_1.png', 'images/Fuda09_1.png']
    },
    {
        name: '猪鹿蝶 (Ino-Shika-Cho)',
        points: 5,
        cards: ['images/Fuda06_1.png', 'images/Fuda07_1.png', 'images/Fuda10_1.png']
    },
    {
        name: '赤短 (Akatan)',
        points: 5,
        cards: ['images/Fuda01_2.png', 'images/Fuda02_2.png', 'images/Fuda03_2.png']
    },
    {
        name: '青短 (Aotan)',
        points: 5,
        cards: ['images/Fuda06_2.png', 'images/Fuda09_2.png', 'images/Fuda10_2.png']
    },
    {
        name: '短冊 (Tanzaku)',
        points: 1,
        // Note: Any 5 tanzaku cards.
        cards: ['images/Fuda01_2.png', 'images/Fuda02_2.png', 'images/Fuda04_2.png', 'images/Fuda05_2.png', 'images/Fuda07_2.png']
    },
    {
        name: 'タネ (Tane)',
        points: 1,
        // Note: Any 5 tane cards.
        cards: ['images/Fuda02_1.png', 'images/Fuda04_1.png', 'images/Fuda05_1.png', 'images/Fuda06_1.png', 'images/Fuda07_1.png']
    },
    {
        name: 'カス (Kasu)',
        points: 1,
        // Note: Any 10 kasu cards.
        cards: ['images/Fuda01_3.png', 'images/Fuda01_4.png', 'images/Fuda02_3.png', 'images/Fuda02_4.png', 'images/Fuda03_3.png', 'images/Fuda03_4.png', 'images/Fuda04_3.png', 'images/Fuda04_4.png', 'images/Fuda05_3.png', 'images/Fuda05_4.png']
    }
];
