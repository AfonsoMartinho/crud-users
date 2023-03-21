import React from "react";
import { UsersStore } from "./stores/UsersStore";

type RootStoreContextValue = {
    usersStore: UsersStore
}

const RootStateContext = React.createContext<RootStoreContextValue>(
    {} as RootStoreContextValue
);

const usersStore = new UsersStore();


export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({
    children,
},) => {
    return(
        <RootStateContext.Provider value={{ usersStore }}>
            {children}
        </RootStateContext.Provider>
    )
};

export const useRootStore = () => React.useContext(RootStateContext);