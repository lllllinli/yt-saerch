import * as React from "react";

export interface InputSearchProps {
    onSearch: (value: string) => void;
}


export interface InputSearchInterface extends React.FC<InputSearchProps> {}