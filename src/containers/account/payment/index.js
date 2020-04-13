import React, { useEffect } from 'react';
import AccountNav from "../../../components/Account/AccountNav";
import image from './img/payment-bg.svg';
import ContentImageBlock from '../../../components/ContentImageBlock';
import {connect} from "react-redux";
import SelectPlanContainer from "./select-plan";
import {getUserPlan} from "../../../services/user";
import EditPlanContainer from "./edit-plan";

const PaymentContainer = props =>  {
    const { user } = props;

    useEffect(() => {
        document.title = `Shosho - Payment`;
    }, []);

    return (
      <>
          <AccountNav />
          <div className="content__wrap">
              <main className="content content--fluid">
                  <ContentImageBlock image={image}>
                      {
                          null !== getUserPlan(user)
                            ? <EditPlanContainer />
                            : <SelectPlanContainer />
                      }

                  </ContentImageBlock>
              </main>
          </div>
      </>
    );
};

const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps)(PaymentContainer);

