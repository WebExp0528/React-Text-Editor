import React, { useEffect } from 'react';
import AccountNav from "../../components/Account/AccountNav";
import image from './img/account-bg.svg';
import ContentImageBlock from '../../components/ContentImageBlock';
import EditForm from '../../components/Account/EditForm';

export default () => {
    useEffect(() => {
        document.title = `Shosho - Account`;
    }, []);

    return (
      <>
          <AccountNav />
          <div className="content__wrap">
              <main className="content content--fluid">
                  <ContentImageBlock image={image}>
                      <EditForm />
                  </ContentImageBlock>
              </main>
          </div>
      </>
    );
};
