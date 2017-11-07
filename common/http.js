//import _ from "lodash";
import { createApolloFetch } from "apollo-fetch";
const uri = "https://api.graph.cool/simple/v1/cj799ixxo0sy80132jecpv6zr";
export const getRows = () => {
  const query =
    'query{ allNotifications(filter:{messageRead:"false"}) {id, message, title,priority,channelTopic,timestamp,messageRead }}';
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};
/*
export const getRows = () => {
  const query =
    "query{ allNotifications {id, message, title,priority,channelTopic,timestamp,messageRead }}";
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query }).then(res => res.data);
};
*/

/*** FRONT END DELETE == SET FIELD READMESSAGE TO TRUE ***/

export const deleteRow = rowId => {
  console.log("HTTP deleteRow " + rowId);
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
  mutation upNotification ($id: ID!) {
    updateNotification (id: $id, messageRead:"true") {
      id
    }
  }
`;
  const variables = {
    id: rowId
  };
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query, variables }).then(res => res.data);
};

/*

export const deleteRow = rowId => {
  console.log("HTTP deleteRow " + rowId);
  //const query = `mutation{deleteDeal(id:${rowId}){id}}`;
  const query = `
  mutation delNotification ($id: ID!) {
    deleteNotification (id: $id) {
      id
    }
  }
`;
  const variables = {
    id: rowId
  };
  const apolloFetch = createApolloFetch({ uri });
  return apolloFetch({ query, variables }).then(res => res.data);
};
*/
