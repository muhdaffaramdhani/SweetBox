const allProducts = [
    { 
        id: 1,
        name: 'Bolu Meranti',
        city: 'Medan',
        price: 95000,
        rating: 5,
        calories: 350,
        description: 'Bolu gulung lembut dengan isian melimpah khas Medan yang legendaris.',
        image: 'assets/images/bolu-meranti.jpg'
    },
    {
        id: 2,
        name: 'Lapis Legit',
        city: 'Pontianak',
        price: 120000,
        rating: 5,
        calories: 420,
        description: 'Kue lapis berlapis-lapis harum rempah dan mentega khas Pontianak.',
        image: 'assets/images/lapis-legit.jpg'
    },
    {
        id: 3,
        name: 'Wingko Babat',
        city: 'Semarang',
        price: 30000,
        rating: 4,
        calories: 250,
        description: 'Kue berbahan kelapa parut dan ketan yang manis gurih khas Semarang.',
        image: 'assets/images/wingko-babat.jpg'
    },
    {
        id: 4,
        name: 'Bakpia Pathok',
        city: 'Yogyakarta',
        price: 45000,
        rating: 5,
        calories: 200,
        description: 'Kue isi kacang hijau manis gurih dengan kulit tipis lembut khas Jogja.',
        image: 'assets/images/bakpia-pathok.jpg'
    },
    {
        id: 5,
        name: 'Lapis Surabaya',
        city: 'Surabaya',
        price: 110000,
        rating: 5,
        calories: 380,
        description: 'Kue tiga lapis lembut dengan perpaduan cokelat dan vanila khas Surabaya.',
        image: 'assets/images/lapis-surabaya.jpg'
    },
    {
        id: 6,
        name: 'Kue Putu',
        city: 'Malang',
        price: 15000,
        rating: 4,
        calories: 180,
        description: 'Kue tradisional kukus isi gula merah dengan taburan kelapa parut segar.',
        image: 'assets/images/kue-putu.jpg'
    },
    {
        id: 7,
        name: 'Dodol Garut',
        city: 'Garut',
        price: 40000,
        rating: 5,
        calories: 300,
        description: 'Manisan kenyal manis dari ketan dan gula merah khas Garut.',
        image: 'assets/images/dodol-garut.jpg'
    },
    {    
        id: 8,
        name: 'Kue Ape Betawi',
        city: 'Jakarta Pusat',
        price: 10000,
        rating: 4,
        calories: 150,
        description: 'Kue dengan bagian tengah empuk dan pinggiran renyah, khas Betawi.',
        image: 'assets/images/kue-ape-betawi.jpg'
    },
    {
        id: 9,
        name: 'Es Pisang Ijo',
        city: 'Makassar',
        price: 20000,
        rating: 5,
        calories: 280,
        description: 'Pisang dibungkus adonan hijau dengan kuah santan manis segar khas Makassar.',
        image: 'assets/images/es-pisang-ijo.jpg'
    },
    {
        id: 10,
        name: 'Bika Ambon',
        city: 'Ambon',
        price: 60000,
        rating: 5,
        calories: 320,
        description: 'Kue berserat legit dengan rasa manis gurih khas Ambon.',
        image: 'assets/images/bika-ambon.jpg'
    },
    {
        id: 11,
        name: 'Klappertaart',
        city: 'Manado',
        price: 55000,
        rating: 5,
        calories: 340,
        description: 'Puding kelapa muda dengan rasa manis gurih khas Manado.',
        image: 'assets/images/klappertaart.jpg'
    },
    {
        id: 12,
        name: 'Kue Barongko',
        city: 'Parepare',
        price: 18000,
        rating: 4,
        calories: 250,
        description: 'Pisang kukus dengan santan manis gurih khas Bugis.',
        image: 'assets/images/kue-barongko.jpg'
    },
    {
        id: 13,
        name: 'Kue Delapan Jam',
        city: 'Palembang',
        price: 150000,
        rating: 5,
        calories: 500,
        description: 'Kue manis legit yang dimasak delapan jam khas Palembang.',
        image: 'assets/images/kue-delapan-jam.jpg'
    },
    {
        id: 14,
        name: 'Es Selendang Mayang',
        city: 'Jakarta Selatan',
        price: 12000,
        rating: 4,
        calories: 200,
        description: 'Es dengan potongan kue berwarna-warni khas Betawi.',
        image: 'assets/images/es-selendang-mayang.jpg'
    },
    {
        id: 15,
        name: 'Kue Bagea',
        city: 'Ternate',
        price: 25000,
        rating: 4,
        calories: 280,
        description: 'Kue keras manis berbahan sagu khas Maluku Utara.',
        image: 'assets/images/kue-bagea.jpg'
    },
    {
        id: 16,
        name: 'Es Dawet Ayu',
        city: 'Banjarnegara',
        price: 15000,
        rating: 5,
        calories: 210,
        description: 'Minuman segar dengan cendol hijau khas Banjarnegara.',
        image: 'assets/images/es-dawet-ayu.jpg'
    },
    {
        id: 17,
        name: 'Kue Sagon',
        city: 'Klaten',
        price: 18000,
        rating: 4,
        calories: 220,
        description: 'Kue kering berbahan kelapa parut khas Jawa Tengah.',
        image: 'assets/images/kue-sagon.jpg'
    },
    {
        id: 18,
        name: 'Kue Lupis',
        city: 'Kediri',
        price: 10000,
        rating: 4,
        calories: 190,
        description: 'Ketan berbalut parutan kelapa dan gula merah cair khas Kediri.',
        image: 'assets/images/kue-lupis.jpg'
    },
    {
        id: 19,
        name: 'Kue Rintak',
        city: 'Bangka',
        price: 30000,
        rating: 4,
        calories: 260,
        description: 'Kue kering dari sagu khas Bangka Belitung.',
        image: 'assets/images/kue-rintak.jpg'
    },
    {
        id: 20,
        name: 'Kue Cucur',
        city: 'Cirebon',
        price: 12000,
        rating: 4,
        calories: 230,
        description: 'Kue goreng manis gurih khas Cirebon.',
        image: 'assets/images/kue-cucur.jpg'
    },
    {
        id: 21,
        name: 'Es Cendol',
        city: 'Bandung',
        price: 15000,
        rating: 5,
        calories: 200,
        description: 'Es manis segar dengan cendol hijau khas Bandung.',
        image: 'assets/images/es-cendol.jpg'
    },
    {
        id: 22,
        name: 'Kue Bugis',
        city: 'Banjarmasin',
        price: 12000,
        rating: 4,
        calories: 210,
        description: 'Kue ketan isi unti kelapa khas Kalimantan Selatan.',
        image: 'assets/images/kue-bugis.jpg'
    },
    {
        id: 23,
        name: 'Kue Bangket Durian',
        city: 'Riau',
        price: 35000,
        rating: 4,
        calories: 240,
        description: 'Kue kering manis gurih dengan aroma durian khas Riau.',
        image: 'assets/images/kue-bangket-durian.jpg'
    },
    {
        id: 24,
        name: 'Kue Karawo',
        city: 'Gorontalo',
        price: 40000,
        rating: 4,
        calories: 270,
        description: 'Kue tradisional dengan cita rasa manis khas Gorontalo.',
        image: 'assets/images/kue-karawo.jpg'
    },
    {
        id: 25,
        name: 'Kue Gegicok',
        city: 'Bogor',
        price: 12000,
        rating: 4,
        calories: 180,
        description: 'Ketan dengan parutan kelapa manis gurih khas Bogor.',
        image: 'assets/images/kue-gegicok.jpg'
    }
];
