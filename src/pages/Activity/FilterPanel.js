import React from 'react';
import Divider from '../../components/Divider';
import CheckBox from '../../components/Input/CheckBox'
import Button from '../../components/Buttons/Button'

const filterList = [
    {
        title: 'Sales',
        key: 'sales'
    },
    {
        title: 'Listings',
        key: 'listings'
    },
    {
        title: 'Bids',
        key: 'bids'
    },
    {
        title: 'Burns',
        key: 'burns'
    },
    {
        title: 'Followings',
        key: 'followings'
    },
    {
        title: 'Likes',
        key: 'likes'
    },
    {
        title: 'Purchase',
        key: 'purchase'
    },
    {
        title: 'Transfers',
        key: 'transfers'
    },
]

function FilterPanel({className='', filters, onChange, ...props}) {

    const getNewFilter = (value) => {
        let newFilters = {...filters};
        for (const key in newFilters) {
            newFilters[key] = value;
        }
        return newFilters;
    }

    const handleSelectAll = () => {
        if( onChange ) {            
            onChange( getNewFilter(true) )
        }
    }
    const handleUnselectAll = () => {
        if( onChange ) {            
            onChange( getNewFilter(false) )
        }
    }
    return (
        <div className={"filter-panel " + className} {...props}>
            <div className="text-body-1-bold mb-32">Filters</div>

            {filterList.map((item, idx) => (
                <CheckBox 
                    className={(idx === filterList.length - 1) ? "" : "mb-4"}
                    title={item.title} 
                    value={filters[item.key]}
                    key={item.key}
                    onChange={(val) => {
                        if( onChange ) {
                            let newFilters = {...filters}
                            newFilters[item.key] = val

                            onChange(newFilters)
                        }
                    }}
                />
            ))}

            <Divider className="mt-32 mb-32"/>
            <div className="d-none d-lg-flex justify-content-between">
                <Button className="small w-100 mr-12" onClick={handleSelectAll}>
                    Select all
                </Button>
                <Button  className="small w-100" onClick={handleUnselectAll}>
                    Unselect all
                </Button>
            </div>
            <div className="d-block d-lg-none">
                <Button className="large w-100 mb-12" onClick={handleSelectAll}>
                    Select all
                </Button>
                <Button  className="large w-100" onClick={handleUnselectAll}>
                    Unselect all
                </Button>
            </div>
            
        </div>
    );
}

export default FilterPanel;
