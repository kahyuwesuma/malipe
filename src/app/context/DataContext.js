'use client'
import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
    const [securities, setSecurities] = useState([]);

    return (
        <DataContext.Provider value={{ securities, setSecurities }}>
            {children}
        </DataContext.Provider>
    );
};
