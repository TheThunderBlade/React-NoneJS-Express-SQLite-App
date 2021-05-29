import {Redirect, Route, Switch} from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import StatsPage from "./pages/StatsPage/StatsPage";
import UserPage from "./pages/UserPage/UserPage";
import './index.scss'

function App() {
    const routes = [
        {path: '/stats', component: StatsPage},
        {path: '/user/:id', component: UserPage}
    ]

    return (
        <div>
            <Switch>
                <Route path={'/'} exact component={MainPage}/>
                {routes.map((route, index) =>
                    <Route key={index} path={route.path} component={route.component}/>
                )}
                <Redirect to={'/'}/>
            </Switch>
        </div>
    );
}

export default App;
