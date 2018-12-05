import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { s4 } from '../styleguide/spacing';

import styled from '../styleguide';
import Button from '../button';
import {Body} from 'app/components/styleguide/text';
import { Flex } from '../styleguide/layout';

import { addFile, IRootState } from 'app/redux/internals';
import { getFileById } from './selectors';

const ActualInput = styled.input`
  width: 0;
  height: 0;
`;

const VisualInput = styled.label`
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  height: 100%;
`;

const Filename = styled(Body)`
  display: block;
  max-width: 240px;
  word-break: break-word;
`;

interface IFileUploadProps {
  id: string;
  uploadBtnText?: string;
  required?: boolean;
}

interface IStateProps {
  file?: File | {};
}

type Props = IStateProps & IFileUploadProps & React.HTMLAttributes<HTMLInputElement & HTMLButtonElement>;

class FileUpload extends React.Component<Props> {

  public render() {

    const {
      id,
      file,
      uploadBtnText,
    } = this.props;

    return (
      <Flex direction="column" align="center" justify="center" grow={1}>
        <ActualInput
          type="file"
          {...this.props}
          name={id}
          onChange={({
            target: {
              validity,
              files,
            },
          }) => validity.valid && files && addFile.dispatch(id, files[0])}
        />
        <Button fullWidth>
          <VisualInput htmlFor={id}>
          {uploadBtnText || 'Choose a file'}
          </VisualInput>
        </Button>
        {file && (
          <Filename marginTop={s4}>{(file as File).name}</Filename>
        )}
      </Flex>
    );
  }

}
export default compose<React.ComponentType<Props>>(
  connect<IStateProps, {}, IFileUploadProps, IRootState>((state, props) => ({
    file: getFileById(state, {id: props.id}),
  })),
)(FileUpload);
