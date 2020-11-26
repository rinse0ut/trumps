import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import { Button } from 'semantic-ui-react'


type PropsType = {
  handleOnFileLoad: (data: any) => void;  
}

const buttonRef: any = React.createRef()

export default function _CSVReader({handleOnFileLoad}: PropsType) {
  const handleOpenDialog = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  const handleOnError = (err: any) => {
    console.log(err)
  }

  const handleOnRemoveFile = (data: any) => {
    console.log('---------------------------')
    console.log(data)
    console.log('---------------------------')
  }

  const handleRemoveFile = (e: any) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={handleOnFileLoad}
        onError={handleOnError}
        noClick
        noDrag
        onRemoveFile={handleOnRemoveFile}
      >
        {({ file }: any) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 10
            }}
          >
            <div
              style={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: '#ccc',
                lineHeight: 2.5,
                marginTop: 5,
                marginBottom: 5,
                marginRight: 5,
              }}
            >
              {file && file.name}
            </div>
            <Button
              primary
              onClick={handleOpenDialog}
            >
              Upload CSV File
            </Button>            
            {/* <Button
              onClick={handleRemoveFile}
            >
              Remove
            </Button> */}
          </aside>
        )}
      </CSVReader>
    )
  }