import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { IRootState } from 'app/redux/root-reducer';
import { s4 } from '../styleguide/spacing';

import styled from '../styleguide';
import Button from '../button';
import {Body} from 'app/components/styleguide/text';
import { Flex } from '../styleguide/layout';

import { addFile } from './actions';
import { getFileById } from './selectors';

const ActualInput = styled.input`
  width: 0;
  height: 0;
`;

const VisualInput = styled.label`
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  height: 100%;
`;

interface IFileUploadProps {
  id: string;
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
    } = this.props;

    return (
      <Flex align="center">
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
        <Button>
          <VisualInput htmlFor={id}>
              Choose a file
          </VisualInput>
        </Button>
        {file && (
          <Body inline marginLeft={s4}>{(file as File).name}</Body>
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
