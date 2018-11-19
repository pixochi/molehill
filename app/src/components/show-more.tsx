import React, { ComponentClass } from 'react';

import { Body } from './styleguide/text';
import styled from './styleguide';

const ShowMoreContainer = styled.div`
  & > * {
    display: inline;

    &:nth-child(2) {
      color: ${props => props.theme.info};
      margin-left: 8px;
      cursor: pointer;
    }
  }
`;

interface IShowMoreProps {
  text?: string | null;
}

interface IState {
  expanded: boolean;
}

const defaultProps = {
  textComponent: Body,
  maxChars: 170,
};

type DefaultProps = Readonly<typeof defaultProps>;

type Props = IShowMoreProps & Partial<DefaultProps>;

class ShowMore extends React.PureComponent<Props & DefaultProps, IState> {

  public static defaultProps = defaultProps;

  constructor(props: any) {
    super(props);
    this.state = {
      expanded: false,
    };
    this.handleShowMore = this.handleShowMore.bind(this);
    this.handleShowLess = this.handleShowLess.bind(this);
  }

  public render() {
    const {
      textComponent: TextComponent,
      text,
      maxChars,
    } = this.props;

    const textShown = this.state.expanded ? text : text && text.slice(0, maxChars).concat('...');

    return (
      <ShowMoreContainer>
        <TextComponent break>{textShown}</TextComponent>
        {text && text.length > maxChars && (
          !this.state.expanded ? (
            <TextComponent break onClick={this.handleShowMore}>Show&nbsp;more</TextComponent>
          ) : (
            <TextComponent onClick={this.handleShowLess}>Show&nbsp;less</TextComponent>
          )
        )}
      </ShowMoreContainer>
    );
  }

  private handleShowMore() {
    this.setState({expanded: true});
  }

  private handleShowLess() {
    this.setState({expanded: false});
  }
}

export default ShowMore as ComponentClass<Props>;
