import React, {useState, useMemo} from 'react';
import Layout from '../../components/Layout'
import Button from '../../components/Buttons/Button'
import Divider from '../../components/Divider'
import Icon from '../../components/Icon'
import Link from '../../components/Link'
import SubNav from '../../components/SubNav'
import FilterPanel from './FilterPanel'
import ActivityListItem from './ActivityListItem';

import { dataActivities } from '../../FakeData/Activity'

const activityTabs = [
    {
        title: 'My activity',
        key: 'my activity'
    },
    {
        title: 'Following',
        key: 'following'
    },
    {
        title: 'All activity',
        key: ''
    }
]

function Activity() {
    const [filters, setFilters] = useState({
        sales: true,
        listings: false,
        bids: false,
        burns: false,
        followings: false,
        likes: false,
        purchase: false,
        transfers: false,
    })
    const [filterPanelVisible, setFilterPanelVisible] = useState(false);
    const [activities, setActivities] = useState(dataActivities);
    const [activityType, setActivityType] = useState('my activity');
    
    const handleChangeFilters = (newFilters) => {
        setFilters(newFilters);
    }

    const handleChangeType = (newType) => {
        setActivityType(newType.key);
    }

    const filteredActivities = useMemo(() => {
        return activities.filter((item) => activityType === '' || item.type === activityType)
    }, [activityType])

    return (
        <Layout page="activity">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-4">
                    <Link href="/">
                        <Button className="normal" icon="arrow-left" iconPos="left">
                            Back to home
                        </Button>
                    </Link>
                    
                    <div className="d-none d-lg-block text-button-2">
                        <span className="neutral-4">Home</span>
                        <span className="size-40 mx-4">
                            <Icon icon="chevron-right" />
                        </span>
                        <span>Activity</span>
                    </div>
                </div>
            </div>
            
            <Divider />

            <div className="section container d-flex justify-content-between">            
                <div className="left-panel">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Activity</h2>
                        {filterPanelVisible ? (
                            <Button 
                                className="d-block d-lg-none normal primary" 
                                icon="close" 
                                circle={true} 
                                onClick={() => setFilterPanelVisible(false)}
                            />
                        ) : (
                            <Button 
                                className="d-block d-lg-none normal" 
                                icon="filter" 
                                circle={true} 
                                onClick={() => setFilterPanelVisible(true)}
                            />
                        )}
                        <Button className="d-none d-lg-block normal">Mark all as read</Button>
                    </div>
                    
                    {filterPanelVisible &&
                        <div className="d-block d-lg-none mt-3">
                            <FilterPanel filters={filters} onChange={handleChangeFilters} />
                        </div>
                    }

                    <Button className="d-block d-lg-none large w-100 mt-3">Mark all as read</Button>

                    <div className="section-content">
                        <SubNav tabs={activityTabs} onChange={handleChangeType}/>

                        <div className="activity-list mt-32" >
                        {filteredActivities.map((activity, idx) => (
                            <ActivityListItem activity={activity} key={idx} />
                        ))}
                        </div>
                        <div className="w-100 mt-3 text-center">
                            <Icon icon="loading" />
                        </div>
                    </div>

                </div>
                <div className="right-panel d-none d-lg-block ml-32">
                    <FilterPanel filters={filters} onChange={handleChangeFilters} />
                </div>
            </div>
        </Layout>
    );
}

export default Activity;
