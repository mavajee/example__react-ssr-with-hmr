# React SSR with HMR

- Code Spliting (Async Routes)
- Prefetch data on server side
- HMR with ssr

## WARNIGN 

Wait for react-route update bug with ssr. [issue](https://github.com/ReactTraining/react-router/commit/f4081ae12e32788ac0580f83d1965cb69585d2d6). Or manualy fix react-route-dom/Link.

## Running and Building

``` bash
# install dependencies
yarn install

# build all
yarn build

# build for client
yarn build:client

# build for server
yarn build:server

# Run ssr server in production mode
yarn start

# Start app in dev mode without ssr
yarn dev:client

# Start app in dev mode with ssr
yarn dev:server
```
