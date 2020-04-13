import React, { useEffect } from 'react';
import AccountNav from "../../../components/Account/AccountNav";
import image from './img/referral-bg.svg';
import {Col, Row} from "react-bootstrap";
import './index.scss';
import InviteBlock from "../../../components/Account/Referral/InviteBlock";
import ReferralHistoryBlock from "../../../components/Account/Referral/ReferralHistoryBlock";
import HowToUseBlock from "../../../components/Account/Referral/HowItWorksBlock";

const ReferralContainer = props =>  {
    useEffect(() => {
        document.title = `Shosho - Referral`;
    }, []);

    return (
      <>
          <AccountNav />
          <div className="content__wrap">
              <main className="content content--fluid">
                <div className="referral">
                  <Row>
                    <Col xs={12} md={6}>
                      <InviteBlock/>
                      <ReferralHistoryBlock/>
                    </Col>
                    <Col xs={12} md={6}>
                      <div className="referral-img__wrap">
                        <img src={image} alt="Shosho" className="referral-img" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <HowToUseBlock/>
                    </Col>
                  </Row>
                </div>
              </main>
          </div>
      </>
    );
};

export default ReferralContainer;

