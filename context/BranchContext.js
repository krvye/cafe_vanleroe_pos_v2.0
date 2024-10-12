import React, { createContext, useState, useContext } from "react"; 
import branchData from "../configurations/branch.json"; 

const BranchContext = createContext(); 

export const useBranches = () => useContext(BranchContext); 

export const BranchProvider = ({ children }) => {
    const [selectedBranch, setSelectedBranch] = useState(null); 

    const branches = branchData.branches; 

    // Change selected branch 
    const selectBranch = (branchCode) => {
        const branch = branches.find((b) => b.branchCode === branchCode); 
        setSelectedBranch(branch); 
    }

    return (
        <BranchContext.Provider value={{ branches, selectedBranch, selectBranch }}>
            {children}
        </BranchContext.Provider>
    );
}