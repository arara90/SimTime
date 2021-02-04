import React from "react";
const ContextStore = React.createContext(null);
export default ContextStore;

//<Store.Provider value = {this.state}
//<Store.Consumer>{store => JSON.sringfy(store)}</Store.Consumer>
// {"message" : "hello"}
//<Store.Consumer>{store => store}</Store.Consumer>
// hello
