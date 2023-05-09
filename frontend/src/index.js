import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import App from './containers/App'
import thunk from 'redux-thunk'
import reducers from './reducers'
import { getUserId } from './config/storage.config';

//snow plow
import {
    newTracker,
    enableActivityTracking,
    trackPageView,
    setUserId,
    setUserIdFromCookie
}
    from '@snowplow/browser-tracker';

import {
    LinkClickTrackingPlugin,
    enableLinkClickTracking
}
    from '@snowplow/browser-plugin-link-click-tracking';

import { BrowserFeaturesPlugin } from '@snowplow/browser-plugin-browser-features';



const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}

let store = createStore(
    reducers,
    applyMiddleware(...middleware)
)

// snowplow
newTracker("book-shop-tracker", "http://localhost:8080", {
    appId: "book-shop", // you can specify your own app name here
    platform: "web",
    encodeBase64: false,

    contexts: {
        webPage: true, // this sets a unique id for each page view
        performanceTiming: true // this captures performance metrics like load times
    },

    plugins: [LinkClickTrackingPlugin(), BrowserFeaturesPlugin()]

})

console.log("user id", getUserId())
setUserId(getUserId());

enableActivityTracking({
    minimumVisitLength: 600,
    heartbeatDelay: 10
});

enableLinkClickTracking();

trackPageView();

render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
)
