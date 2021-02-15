// import React from 'react'
//
// const Data = React.createContext({});
//
// export default Data;

import React, {useState, createContext, useEffect} from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [ndata, setNdata] = useState("datagdsgsd");

    const value = {
        currentData: [ndata, setNdata],
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext