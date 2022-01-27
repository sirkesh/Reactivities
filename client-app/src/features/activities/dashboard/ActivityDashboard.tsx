import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "../dashboard/ActivityList";
import ActivityFilters from  "../dashboard/ActivityFilters";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite';
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
    const { activityStore } = useStore();
    const { loadActivities, activityRegistry } = activityStore;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (activityRegistry.size <= 1) loadActivities();
    }, [activityRegistry.size, loadActivities]);

    if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />


    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList />
            </Grid.Column>
            <Grid.Column width="6">
               <ActivityFilters />
            </Grid.Column>
        </Grid>
    )
}
export default observer(ActivityDashboard);