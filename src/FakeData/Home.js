
import avatar01 from '../assets/images/avatar/avatar01.png'
import avatar02 from '../assets/images/avatar/avatar02.png'
import avatar03 from '../assets/images/avatar/avatar03.png'
import avatar04 from '../assets/images/avatar/avatar04.png'
import avatar05 from '../assets/images/avatar/avatar05.png'
import avatar06 from '../assets/images/avatar/avatar06.png'

import poster01 from '../assets/images/poster/poster01.png'
import poster02 from '../assets/images/poster/poster02.png'
import poster03 from '../assets/images/poster/poster03.png'
import poster04 from '../assets/images/poster/poster04.png'
import poster05 from '../assets/images/poster/poster05.png'
import poster06 from '../assets/images/poster/poster06.png'
import poster07 from '../assets/images/poster/poster07.png'
import poster08 from '../assets/images/poster/poster08.png'
import poster09 from '../assets/images/poster/poster09.png'
import poster10 from '../assets/images/poster/poster10.png'

export const bidInfoData = [
    {
        title: "the creator network®",
        creator: {
            name: "Enrico Cole",
            avatar: avatar01
        },
        info: {
            price: 3.5,
            avatar: avatar02
        }
    },
    {
        title: "Marco carrillo®",
        creator: {
            name: "Enrico Cole",
            avatar: avatar01
        },
        info: {
            price: 3.5,
            avatar: avatar02
        }
    }
];

export const NFTs = [
    {
        title: "The future of ETH®",
        image: poster01,
        stock: 18,
        count: 1,
        bid: 1.125,
        owner: {
            name: "Payton Harris",
            avatar: avatar01,
            wallet: 2.456,
            badge: 6
        }
    },
    {
        title: "ETH never die",
        image: poster02,
        stock: 12,
        count: 1,
        bid: 0.27,
        owner: {
            name: "Anita Bins",
            avatar: avatar01,
            wallet: 2.456,
            badge: 2
        }
    },
    {
        title: "Future coming soon",
        image: poster03,
        stock: 3,
        count: 1,
        bid: 0.27,
        owner: {
            name: "Joana Wuckert",
            avatar: avatar02,
            wallet: 2.456,
            badge: 3
        }
    }
];

export const NFTUsers = [
    {
        name: "Payton Harris",
        avatar: avatar01,
        wallet: 2.456,
        badge: 6
    },
    {
        name: "Anita Bins",
        avatar: avatar02,
        wallet: 2.456,
        badge: 2
    },
    {
        name: "Joana Wuckert",
        avatar: avatar03,
        wallet: 2.456,
        badge: 3
    },
    {
        name: "Lorena Ledner",
        avatar: avatar04,
        wallet: 2.456,
        badge: 4
    }
]

export const ListDates = [
    {
        title: "Today"
    },
    {
        title: "Yesterday",
    }, {
        title: "Month",
    }
]

export const Sellers = [
    {
        name: "Payton Harris",
        avatar: avatar01,
        wallet: 2.456,
        isVerified: true,
        status: {
            color: "blue",
            icon: "cup",
            text: "#1"
        }
    },
    {
        name: "Anita Bins",
        avatar: avatar03,
        wallet: 2.456,
        isVerified: true,
        status: {
            color: "purple",
            icon: "donut",
            text: "#2"
        }
    },
    {
        name: "Joana Wuckert",
        avatar: avatar04,
        wallet: 2.456,
        isVerified: true,
        status: {
            color: "green",
            icon: "lightning",
            text: "#3"
        }
    },
    {
        name: "Lorena Ledner",
        avatar: avatar05,
        wallet: 2.456,
        isVerified: true,
        status: {
            color: "black",
            icon: "doughnut",
            text: "#4"
        }
    },
    {
        name: "Payton Buckridge",
        avatar: avatar06,
        wallet: 2.456,
        isVerified: false,
        status: {
            color: "gray",
            icon: "doughnut",
            text: "#5"
        }
    },
    {
        name: "Lorena Ledner",
        avatar: avatar05,
        wallet: 2.456,
        isVerified: true,
        status: {
            color: "black",
            icon: "doughnut",
            text: "#4"
        }
    }
]


export const dataHotbids = [
    {
        itemName: "The future of ETH®",
        image: poster01,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar01 },
            { avatar: avatar01 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "ETH never die",
        image: poster02,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar02 },
            { avatar: avatar01 },
        ],
        prsalePriceice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "Future coming soon",
        image: poster03,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar03 },
            { avatar: avatar04 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "ETH never die",
        image: poster08,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar02 },
            { avatar: avatar01 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "Future coming soon",
        image: poster06,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar03 },
            { avatar: avatar04 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "The future of ETH®",
        image: poster01,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar01 },
            { avatar: avatar01 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    },
    {
        itemName: "ETH never die",
        image: poster02,
        stock: [
            { avatar: avatar01 },
            { avatar: avatar02 },
            { avatar: avatar01 },
        ],
        salePrice: 1.125,
        highest: 0.001,
    }
];

export const dataHotCollection = [
    {
        title: "The future of ETH®",
        image: poster01,
        collection: [poster01, poster02, poster03, poster04, poster05],
        owner: {
            name: "Payton Harris",
            avatar: avatar01,
            wallet: 2.456,
            badge: 6
        }
    },
    {
        title: "ETH never die",
        image: poster02,
        collection: [poster06, poster07, poster08, poster09, poster10],
        owner: {
            name: "Anita Bins",
            avatar: avatar01,
            wallet: 2.456,
            badge: 2
        }
    },
    {
        title: "Future coming soon",
        image: poster03,
        collection: [poster04, poster03, poster08, poster06, poster02],
        owner: {
            name: "Joana Wuckert",
            avatar: avatar02,
            wallet: 2.456,
            badge: 3
        }
    }
];

export const dataSortOrder = [
    {
        title: "Recently added"
    },
    {
        title: "Recently added"
    }
];

export const dataFilterPrice = [
    {
        title: "Highest Price"
    },
    {
        title: "Lowest Price"
    }
]

export const dataFilterLike = [
    {
        title: "All items",
    },
    {
        title: "Not for sale"
    },
    {
        title: "Highest price"
    },
    {
        title: "Lowest price"
    },
];

export const dataFilterCreator = [
    {
        title: "Verified only"
    },
    {
        title: "Not verified"
    }
]