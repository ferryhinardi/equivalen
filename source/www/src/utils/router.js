import qs from 'querystring';

export const getQueries = (props) => {
  const url =
    props.location &&
    props.location.search &&
    props.location.search.replace('?', '');
  const queries = qs.parse(url);
  return queries;
};
