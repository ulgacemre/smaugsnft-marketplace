import React from 'react';
import {ReactComponent as Search} from '../assets/icons/Search/Line.svg'
import {ReactComponent as Bell} from '../assets/icons/Bell/Line.svg'
import {ReactComponent as ZoomIn} from '../assets/icons/Zoom In/Line.svg'
import {ReactComponent as ZoomInFill} from '../assets/icons/Zoom In/Filled.svg'
import {ReactComponent as ZoomOut} from '../assets/icons/Zoom Out/Line.svg'
import {ReactComponent as ZoomOutFill} from '../assets/icons/Zoom Out/Filled.svg'
import {ReactComponent as ArrowUp} from '../assets/icons/Arrow Up 2/Line.svg'
import {ReactComponent as ArrowDown} from '../assets/icons/Arrow Down 2/Line.svg'
import {ReactComponent as ArrowLeft} from '../assets/icons/Arrow Left 2/Line.svg'
import {ReactComponent as ArrowRight} from '../assets/icons/Arrow Right 2/Line.svg'
import {ReactComponent as ChevronUp} from '../assets/icons/Arrow Up Simple/Line.svg'
import {ReactComponent as ChevronDown} from '../assets/icons/Arrow Down Simple/Line.svg'
import {ReactComponent as ChevronLeft} from '../assets/icons/Arrow Left Simple/Line.svg'
import {ReactComponent as ChevronRight} from '../assets/icons/Arrow Right Simple/Line.svg'
import {ReactComponent as ChevronLeftSquare} from '../assets/icons/Arrow Left Square/Line.svg'
import {ReactComponent as ChevronRightSquare} from '../assets/icons/Arrow Right Square/Line.svg'
import {ReactComponent as ArrowExpand} from '../assets/icons/Arrow expand/Line.svg'
import {ReactComponent as Verified} from '../assets/icons/Verified/Line.svg'
import {ReactComponent as PlusSquare} from '../assets/icons/Plus Square/Line.svg'
import {ReactComponent as MinusSquare} from '../assets/icons/Minus Square/Line.svg'
import {ReactComponent as Plus1} from '../assets/icons/Plus 1/Line.svg'
import {ReactComponent as Plus2} from '../assets/icons/Plus 2/Line.svg'
import {ReactComponent as Minus1} from '../assets/icons/Minus 1/Line.svg'
import {ReactComponent as Minus2} from '../assets/icons/Minus 2/Line.svg'
import {ReactComponent as Cup} from '../assets/icons/Cup/Line.svg'
import {ReactComponent as Donut} from '../assets/icons/Donut/Line.svg'
import {ReactComponent as Lightning} from '../assets/icons/Lightning/Line.svg'
import {ReactComponent as Doughnut} from '../assets/icons/Doughnut/Line.svg'
import {ReactComponent as Heart} from '../assets/icons/Heart/Line.svg'
import {ReactComponent as HeartFill} from '../assets/icons/Heart/Filled.svg'
import {ReactComponent as ScatterUp} from '../assets/icons/Scatter Up/Line.svg'
import {ReactComponent as ScatterDown} from '../assets/icons/Scatter Down/Line.svg'
import {ReactComponent as CandleUp} from '../assets/icons/Candlesticks Up/Line.svg'
import {ReactComponent as CandleDown} from '../assets/icons/Candlesticks Down/Line.svg'
import {ReactComponent as Close} from '../assets/icons/Close/Line.svg'
import {ReactComponent as Loading} from '../assets/icons/Loading/Line.svg'
import {ReactComponent as Burger} from '../assets/icons/Burger/Line.svg'
import {ReactComponent as FileUpload} from '../assets/icons/File Upload/Line.svg'
import {ReactComponent as CloseCircle} from '../assets/icons/Close Circle/Line.svg'
import {ReactComponent as CloseCircleFill} from '../assets/icons/Close Circle/Filled.svg'
import {ReactComponent as Pencil} from '../assets/icons/Pencil/Line.svg'
import {ReactComponent as ShoppingBag} from '../assets/icons/Shopping Bag/Line.svg'
import {ReactComponent as Wallet} from '../assets/icons/Wallet/Line.svg'
import {ReactComponent as Check} from '../assets/icons/Check/Line.svg'
import {ReactComponent as Coin} from '../assets/icons/Coin/Line.svg'
import {ReactComponent as CoinFill} from '../assets/icons/Coin/Filled.svg'
import {ReactComponent as Coins} from '../assets/icons/Coins/Line.svg'
import {ReactComponent as CoinsFill} from '../assets/icons/Coins/Filled.svg'
import {ReactComponent as Globe} from '../assets/icons/Globe/Line.svg'
import {ReactComponent as ShareSquare} from '../assets/icons/Share Square/Line.svg'
import {ReactComponent as More} from '../assets/icons/More/Line.svg'
import {ReactComponent as Twitter} from '../assets/icons/Twitter/Line.svg'
import {ReactComponent as Instagram} from '../assets/icons/Instagram/Line.svg'
import {ReactComponent as Facebook} from '../assets/icons/Facebook/Line.svg'
import {ReactComponent as Pinterest} from '../assets/icons/Pinterest/Line.svg'
import {ReactComponent as Image} from '../assets/icons/Image/Line.svg'
import {ReactComponent as Edit} from '../assets/icons/Edit/Line.svg'
import {ReactComponent as Filter} from '../assets/icons/Filter/Line.svg'
import {ReactComponent as SportsFlag} from '../assets/icons/Sports-flag/Line.svg'
import {ReactComponent as Play} from '../assets/icons/Play/Line.svg'
import {ReactComponent as Download} from '../assets/icons/Download/Line.svg'
import {ReactComponent as Megaphone} from '../assets/icons/Megaphone/Line.svg'
import {ReactComponent as User} from '../assets/icons/User/Line.svg'
import {ReactComponent as LightBulb} from '../assets/icons/Light Bulb/Line.svg'
import {ReactComponent as SignOut} from '../assets/icons/Sign Out/Line.svg'
import {ReactComponent as InfoCircle} from '../assets/icons/Info Circle/Line.svg'
import {ReactComponent as Insert} from '../assets/icons/Insert/Line.svg'

const icons = [
    {
        name: 'search',
        icon: (props) => <Search {...props}/>
    },    
    {
        name: 'bell',
        icon: (props) => <Bell {...props}/>
    },
    {
        name: 'zoom-in',
        icon: (props) => <ZoomIn {...props}/>
    },
    {
        name: 'zoom-in-fill',
        icon: (props) => <ZoomInFill {...props}/>
    },
    {
        name: 'zoom-out',
        icon: (props) => <ZoomOut {...props}/>
    },
    {
        name: 'zoom-out-fill',
        icon: (props) => <ZoomOutFill {...props}/>
    },
    {
        name: 'arrow-left',        
        icon: (props) => <ArrowLeft {...props}/>
    },    
    {
        name: 'arrow-right',
        icon: (props) => <ArrowRight {...props}/>
    },    
    {
        name: 'arrow-up',
        icon: (props) => <ArrowUp {...props}/>
    },    
    {
        name: 'arrow-down',
        icon: (props) => <ArrowDown {...props}/>
    },    
    {
        name: 'chevron-up',
        icon: (props) => <ChevronUp {...props}/>
    },    
    {
        name: 'chevron-down',
        icon: (props) => <ChevronDown {...props}/>
    },    
    {
        name: 'chevron-left',
        icon: (props) => <ChevronLeft {...props}/>
    },    
    {
        name: 'chevron-right',
        icon: (props) => <ChevronRight {...props}/>
    },    
    {
        name: 'chevron-left-square',
        icon: (props) => <ChevronLeftSquare {...props}/>
    },    
    {
        name: 'chevron-right-square',
        icon: (props) => <ChevronRightSquare {...props}/>
    },
    {
        name: 'arrow-expand',
        icon: (props) => <ArrowExpand {...props}/>
    },
    {
        name: 'verified',
        icon: (props) => <Verified {...props}/>
    },
    {
        name: 'plus-square',
        icon: (props) => <PlusSquare {...props}/>
    },
    {
        name: 'minus-square',
        icon: (props) => <MinusSquare {...props}/>
    },
    {
        name: 'plus-1',
        icon: (props) => <Plus1 {...props}/>
    },
    {
        name: 'minus-1',
        icon: (props) => <Minus1 {...props}/>
    },
    {
        name: 'plus-2',
        icon: (props) => <Plus2 {...props}/>
    },
    {
        name: 'minus-2',
        icon: (props) => <Minus2 {...props}/>
    },
    {
        name: 'cup',
        icon: (props) => <Cup {...props}/>
    },
    {
        name: 'donut',
        icon: (props) => <Donut {...props}/>
    },
    {
        name: 'doughnut',
        icon: (props) => <Doughnut {...props}/>
    },
    {
        name: 'lightning',
        icon: (props) => <Lightning {...props}/>
    },
    {
        name: 'heart',
        icon: (props) => <Heart {...props}/>
    },
    {
        name: 'heart-fill',
        icon: (props) => <HeartFill {...props}/>
    },
    {
        name: 'scatter-up',
        icon: (props) => <ScatterUp {...props}/>
    },
    {
        name: 'scatter-down',
        icon: (props) => <ScatterDown {...props}/>
    },
    {
        name: 'candle-up',
        icon: (props) => <CandleUp {...props}/>
    },
    {
        name: 'candle-down',
        icon: (props) => <CandleDown {...props}/>
    },
    {
        name: 'close',
        icon: (props) => <Close {...props}/>
    },
    {
        name: 'loading',
        icon: (props) => <Loading {...props}/>
    },
    {
        name: 'burger',
        icon: (props) => <Burger {...props}/>
    },
    {
        name: 'file-upload',
        icon: (props) => <FileUpload {...props}/>
    },
    {
        name: 'close-circle',
        icon: (props) => <CloseCircle {...props}/>
    },
    {
        name: 'close-circle-fill',
        icon: (props) => <CloseCircleFill {...props}/>
    },
    {
        name: 'pencil',
        icon: (props) => <Pencil {...props}/>
    },
    {
        name: 'shopping-bag',
        icon: (props) => <ShoppingBag {...props}/>
    },
    {
        name: 'wallet',
        icon: (props) => <Wallet {...props}/>
    },
    {
        name: 'check',
        icon: (props) => <Check {...props}/>
    },
    {
        name: 'coin',
        icon: (props) => <Coin {...props}/>
    },
    {
        name: 'coin-fill',
        icon: (props) => <CoinFill {...props}/>
    },
    {
        name: 'coins',
        icon: (props) => <Coins {...props}/>
    },
    {
        name: 'coins-fill',
        icon: (props) => <CoinsFill {...props}/>
    },
    {
        name: 'globe',
        icon: (props) => <Globe {...props}/>
    },
    {
        name: 'share-square',
        icon: (props) => <ShareSquare {...props}/>
    },
    {
        name: 'more',
        icon: (props) => <More {...props}/>
    },
    {
        name: 'twitter',
        icon: (props) => <Twitter {...props}/>
    },
    {
        name: 'instagram',
        icon: (props) => <Instagram {...props}/>
    },
    {
        name: 'facebook',
        icon: (props) => <Facebook {...props}/>
    },
    {
        name: 'pinterest',
        icon: (props) => <Pinterest {...props}/>
    },
    {
        name: 'image',
        icon: (props) => <Image {...props}/>
    },
    {
        name: 'edit',
        icon: (props) => <Edit {...props}/>
    },
    {
        name: 'filter',
        icon: (props) => <Filter {...props}/>
    },
    {
        name: 'sports-flag',
        icon: (props) => <SportsFlag {...props}/>
    },
    {
        name: 'play',
        icon: (props) => <Play {...props}/>
    },
    {
        name: 'download',
        icon: (props) => <Download {...props}/>
    },
    {
        name: 'megaphone',
        icon: (props) => <Megaphone {...props}/>
    },
    {
        name: 'user',
        icon: (props) => <User {...props}/>
    },
    {
        name: 'light-bulb',
        icon: (props) => <LightBulb {...props}/>
    },
    {
        name: 'sign-out',
        icon: (props) => <SignOut {...props}/>
    },
    {
        name: 'info-circle',
        icon: (props) => <InfoCircle {...props}/>
    },
    {
        name: 'insert',
        icon: (props) => <Insert {...props}/>
    }
]

const Icon = function(props) {

    const filteredIcon = icons.filter((icon) => props.icon === icon.name );    

    if( filteredIcon.length == 0 )
        return "";

    const iconSvg = filteredIcon[0].icon
    
    let width = 24
    let height = 24;

    
    if( props.size === 'sm' ) {        
        width = 20;
        height = 20;
    } else if( props.size === 'lg' ) {
        width = 32;
        height = 32;
    } else if( props.size === 'xl' ) {
        width = 40;
        height = 40;
    } else if( props.size === 'xxl' ) {
        width = 48;
        height = 48;
    } else if( props.size === 'xs' ) {
        width = 16;
        height = 16;
    } else if( props.size === 'xxs' ) {
        width = 12;
        height = 12;
    }

    let newProps = {
        width: props.width || width,
        height: props.height || height,
        ...props
    }
    
    return (
      <>
        {iconSvg(newProps)}
      </>
    );
}

export default Icon;
