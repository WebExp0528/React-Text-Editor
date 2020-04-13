import React  from 'react';
import Aside from '../Aside';
import Nav from '../Nav';
import './index.scss';
import {Switch, Route} from 'react-router-dom';
import StoryBlock from '../Story/StoryBlock';
import FolderBlock from '../Folder/FolderBlock';
import FolderSingle from '../Folder/FolderSingle';

class Main extends React.Component {
    render() {
        return (
            <>
              <Aside/>
              <Nav/>
              <div className="content__wrap">
                  <main className="content">
                      <Switch>
                          <Route path="/" component={StoryBlock} exact/>
                          <Route path="/folders" component={FolderBlock} exact/>
                          <Route path="/folders/:id(\d+)" component={FolderSingle} exact/>
                        </Switch>
                    </main>
                </div>
            </>
        )
    }
}

export default Main;
