import React, { useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

const Invite = props => {

  useEffect(() => {
    localStorage.setItem('referrerCode', props.match.params.code);
  }, [props.match.params.code]);

  return (
    <Redirect to={"/login"}/>
  );
};

export default withRouter(Invite);
