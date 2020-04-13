import React, { useState } from 'react';
import './index.scss';
import InviteForm from "./InviteForm";
import {getReferralLink} from "../../../../services/user";
import {connect} from "react-redux";
import {Alert} from "react-bootstrap";

const InviteBlock = props => {
  const [ open, setOpen ] = useState(false);

  return (
    <div className="invite-block">
      <div className="invite-block__title">
        Invite friends, get free months of Premium
      </div>
      <div className="invite-block__desc">
        Invite your friends and earn one month for free for each friend once they complete their first payment.
      </div>
      <InviteForm/>
      <div 
        className="invite-block__link thisisclip" 
        data-clipboard-text={getReferralLink(props.user)}
        onClick={() => {
          setOpen(true);
        }}
        >
          Copy Your Unique Referral Link          
      </div>
      <Alert
        show={open}
        onClose={() => setOpen(false)}
        variant="success"
        dismissible
      >
        Link copied!
      </Alert>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.login.user
});

export default connect(mapStateToProps)(InviteBlock);
