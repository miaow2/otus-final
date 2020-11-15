import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const FailHighlighter = ({ result }) => {
  return (
    <SyntaxHighlighter
      language="json"
      style={docco}
      customStyle={{ borderRadius: '.25rem', borderColor: 'rgba(0,0,0,.125)', borderStyle: 'solid', borderWidth: '1px' }}>
      {result}
    </SyntaxHighlighter>
  );
};

const SuccessHighlighter = ({ result }) => {

  let status = null;
  let borderStatusColor = null;

  if (result.failed) {
    status = <span className="badge badge-danger" style={{ fontSize: '.7125rem' }}>Failed</span>
    borderStatusColor = "#e51c23"
  } else {
    status = <span className="badge badge-success" style={{ fontSize: '.7125rem' }}>Success</span>
    borderStatusColor = "#4caf50"
  };

  return (
    <>
      <h5>{result.hostname} {status}</h5>
      <SyntaxHighlighter
        language="bash"
        style={docco}
        customStyle={{ borderRadius: '.25rem', borderColor: `${borderStatusColor}`, borderStyle: 'solid', borderWidth: '1px' }}>
        {result.raw_output}
      </SyntaxHighlighter>
    </>
  );
};

export {
  FailHighlighter,
  SuccessHighlighter
};