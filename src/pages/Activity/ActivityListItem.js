import React from 'react';
import Icon from '../../components/Icon'

function ActivityListItem({activity, className, ...props}) {
    return (
        <div className={"activity-list-item d-flex align-items-center " + className} {...props}>
            <div className="avatar mr-4">
                <img src={activity.image} className="rounded-circle"/>
                <div className={"activity-badge badge-tr " + (activity.highlight ? "highlight" : "") }>
                    <Icon icon={activity.icon} className="svg-neutral-8" />
                </div>
            </div>
            
            <div className="d-block d-lg-none">
                <div className="text-body-2-bold neutral-1">{activity.title}</div>
                <div className="text-caption-2 neutral-3">{activity.description}</div>
                <div className="text-caption-2-bold neutral-4">{activity.time}</div>
            </div>

            <div className="d-none d-lg-block">
                <div className="text-body-1-bold neutral-1">{activity.title}</div>
                <div className="text-body-2 neutral-3">{activity.description}</div>
                <div className="text-caption-2-bold neutral-4">{activity.time}</div>
            </div>
            
            <div className="ml-auto activity-mark">
                <Icon icon="chevron-right" className="hover-mark" />
            </div>
        </div>
    );
}

export default ActivityListItem;
