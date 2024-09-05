
export type ShaderParameter = {
    ty: string,
    label: string,
    description: string,
};
export type ShaderSignature = {
    returnType: string,
    description: string,
    parameters: ShaderParameter[],
};

export enum ShaderStage {
    Vertex,
    Fragment,
    Compute,
    TesselationControl,
    TesselationEvaluation,
    Mesh,
    Task,
    Geometry,
    RayGeneration,
    ClosestHit,
    AnyHit,
    Callable,
    Miss,
    Intersect,
}

export type ShaderSymbol = {
    id?: string,                 // Unique id for react rendering
    label: string,               // Label for the item
    description: string,         // Description of the item
    version: string,             // Minimum version required for the item.
    stages: ShaderStage[],       // Shader stages of the item
    link?: string,               // Link to some external documentation
    signature?: ShaderSignature, // Signature of function
    ty?: string,                 // Type of variables
}
export enum ShaderSymbolType {
    Types,
    Constants,
    Variables,
    Functions,
    Keywords
}
export type ShaderSymbolList = {
    types: ShaderSymbol[],
    constants: ShaderSymbol[],
    variables: ShaderSymbol[],
    functions: ShaderSymbol[],
    keywords: ShaderSymbol[],
}

export function formatSignature(label: string, signature : ShaderSignature) {
    let parameters = signature.parameters.map(e => {
        return `${e.ty} ${e.label}`;
    });
    return `${signature.returnType} ${label}(${parameters.join(", ")})`;
}