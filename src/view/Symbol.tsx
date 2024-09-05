import { Accordion, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { ShaderSymbol, ShaderSymbolType } from './Shader';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash } from 'react-icons/fa';

type SymbolProps = {
    symbol : ShaderSymbol;
    type: ShaderSymbolType;
    index: number;
    handleSymbolChange: ((index: number, symbol: ShaderSymbol) => void)
}

export function supportTypeField(type: ShaderSymbolType) {
    switch(type) {
        case ShaderSymbolType.Constants:
        case ShaderSymbolType.Variables:
            return true;
        case ShaderSymbolType.Functions:
        case ShaderSymbolType.Keywords:
        case ShaderSymbolType.Types:
            return false;
    }
}

export function supportSignatureField(type: ShaderSymbolType) {
    switch(type) {
        case ShaderSymbolType.Functions:
            return true;
        case ShaderSymbolType.Constants:
        case ShaderSymbolType.Variables:
        case ShaderSymbolType.Keywords:
        case ShaderSymbolType.Types:
            return false;
    }
}

function Symbol(props: SymbolProps) {
  const handleLabelChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        label: e.target.value,
    });
  };
  const handleDescriptionChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        description: e.target.value,
    });
  };
  const handleVersionChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        version: e.target.value,
    });
  };
  const handleLinkChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        link: e.target.value,
    });
  };
  const handleTypeChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        ty: e.target.value,
    });
  };
  const handleReturnChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!,
            returnType: e.target.value,
        },
    });
  };
  const handleReturnDescChange = (e : any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!,
            description: e.target.value,
        },
    });
  };
  const handleParamTypeChange =  (e: any, index: number) => {
    props.symbol.signature!.parameters[index].ty = e.target.value;
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!
        },
    });
  };
  const handleParamLabelChange =  (e: any, index: number) => {
    props.symbol.signature!.parameters[index].label = e.target.value;
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!
        },
    });
  };
  const handleParamDescChange =  (e: any, index: number) => {
    props.symbol.signature!.parameters[index].description = e.target.value;
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!
        },
    });
  };
  
  const handleParameterAdd = (e: any) => {
    props.handleSymbolChange(props.index, {
        ...props.symbol,
        signature: {
            ...props.symbol.signature!,
            parameters: [
                ...props.symbol.signature!.parameters,
                {
                    ty: "void",
                    description: "",
                    label: "x"
                }
            ]
        },
    });
  }
  
  const handleParameterRemove = (index: number) => {
    props.symbol.signature!.parameters.splice(index, 1);
    props.handleSymbolChange(props.index, {
        ...props.symbol
    });
  }
  return (
    <div>
        <InputGroup size="sm">
            <InputGroup.Text>Label</InputGroup.Text>
            <Form.Control aria-label="Label" defaultValue={props.symbol.label} onChange={handleLabelChange}/>
        </InputGroup>
        <InputGroup size="sm">
            <InputGroup.Text>Description</InputGroup.Text>
            <Form.Control as="textarea" aria-label="Description" defaultValue={props.symbol.description} onChange={handleDescriptionChange}/>
        </InputGroup>
        <InputGroup size="sm">
            <InputGroup.Text>Version</InputGroup.Text>
            <Form.Control aria-label="Version" defaultValue={props.symbol.version} onChange={handleVersionChange}/>
        </InputGroup>
        <InputGroup size="sm">
            <InputGroup.Text>Link</InputGroup.Text>
            <Form.Control aria-label="Link" defaultValue={props.symbol.link} onChange={handleLinkChange}/>
        </InputGroup>
        {
            !supportTypeField(props.type) ? undefined : <InputGroup size="sm">
                <InputGroup.Text>Type</InputGroup.Text>
                <Form.Control aria-label="Type" defaultValue={props.symbol.ty} onChange={handleTypeChange}/>
            </InputGroup>
        }
        {
            props.type === ShaderSymbolType.Functions ? <Card border="primary" >
                <Card.Header>Signature</Card.Header>
                <Card.Body>
                    <InputGroup size="sm">
                        <InputGroup.Text>Return</InputGroup.Text>
                        {/* Could be a combo box with all possibles types. */}
                        <Form.Control aria-label="Return" defaultValue={props.symbol.signature?.returnType} onChange={handleReturnChange}/>
                    </InputGroup>
                    <InputGroup size="sm">
                        <InputGroup.Text>Description</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="Description" defaultValue={props.symbol.signature?.description} onChange={handleReturnDescChange}/>
                    </InputGroup>
                    <Accordion defaultActiveKey="0">
                        {
                            props.symbol.signature?.parameters.length === 0 ? 
                                <span>No parameters</span> : 
                            props.symbol.signature?.parameters.map((parameter, index) => {
                                return (<Accordion.Item key={index} eventKey={index + ''}>
                                    <Accordion.Header>
                                        Parameter {parameter.ty} {parameter.label}
                                        &nbsp;&nbsp;
                                        <FaTrash onClick={e =>{ handleParameterRemove(index); e.stopPropagation();}}/>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <InputGroup size="sm">
                                            <InputGroup.Text>Type</InputGroup.Text>
                                            <Form.Control aria-label="Type" defaultValue={parameter.ty} onChange={e => handleParamTypeChange(e, index)}/>
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputGroup.Text>Label</InputGroup.Text>
                                            <Form.Control aria-label="Label" defaultValue={parameter.label} onChange={e => handleParamLabelChange(e, index)}/>
                                        </InputGroup>
                                        <InputGroup size="sm">
                                            <InputGroup.Text>Description</InputGroup.Text>
                                            <Form.Control as="textarea" aria-label="Description" defaultValue={parameter.description} onChange={e => handleParamDescChange(e, index)}/>
                                        </InputGroup>
                                    </Accordion.Body>
                                </Accordion.Item>);
                            })
                        }
                    </Accordion>
                    <Button onClick={handleParameterAdd}>Add parameter</Button>
                </Card.Body>
            </Card> : undefined
        }
                            
    </div>
  );
}

export default Symbol;
