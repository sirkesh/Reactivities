import React, { useEffect } from 'react';
import { Container } from "semantic-ui-react";
import NavBar from "../layout/NavBar";
import LoadingComponent from "../layout/LoadingComponent";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { useStore } from "../stores/store";
import { observer } from 'mobx-react-lite';

const App = () => {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <>
      <NavBar />
   
      <Container style={{ marginTop: "7em" }}>
   
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
