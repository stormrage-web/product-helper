
export interface IHypo {
    id: string;
    name: string;
    proba: number;
}

export type IHypoList = IHypo[];

export interface IPlotDot {
    x: number,
    y: number
}

export interface IPlot {
    name: string;
    type: "linear" | "hist" | "circle";
    data: IPlotDot[];
}

export interface IHypoState {
    list: IHypoList;
    isLoading: boolean;
}

export interface IDashState {
    message: string;
    first_graph: IPlot | undefined;
    second_graph: IPlot | undefined;
    thirs_graph: IPlot | undefined;
    isLoading: boolean;
}