import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';
import {Toast} from 'antd-mobile';
import {browserHistory} from 'dva/router';

// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(e) {
    Toast.fail(e.message, 2); //全局错误提示
  }
});

// 2. Plugins
app.use(createLoading());

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/portal').default);
app.model(require('./models/menu').default);
app.model(require('./models/chat').default);
app.model(require('./models/navigation').default);
app.model(require('./models/order').default);
app.model(require('./models/login').default);
app.model(require('./models/table').default);
app.model(require('./models/customer').default);
app.model(require('./models/setting').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
