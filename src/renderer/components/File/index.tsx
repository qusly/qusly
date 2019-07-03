import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { File as IFile } from '~/renderer/models';
import { resizeTextarea } from '~/renderer/utils';
import { StyledFile, Icon, Label, Input } from './styles';

interface Props {
  data?: IFile;
}

@observer
export default class File extends React.PureComponent<Props> {
  public ref = React.createRef<HTMLDivElement>();

  public inputRef = React.createRef<HTMLTextAreaElement>();

  componentDidMount() {
    store.pages.current.filesComponents.push(this);
  }

  componentWillUnmount() {
    const page = store.pages.current;

    if (page) {
      const index = page.filesComponents.indexOf(this);
      if (index !== -1) {
        page.filesComponents.splice(index, 1);
      }
    }
  }

  private onClick = () => {
    store.dragging.hide();
  };

  private onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();

    const { data } = this.props;

    if (e.ctrlKey) {
      data.selected = true;
    } else if (e.shiftKey) {
      this.selectGroup();
    } else {
      store.pages.current.focusFile(data);
    }

    store.dragging.show(e);
  };

  private onMouseEnter = () => {
    const { data } = this.props;
    store.pages.current.hoveredFile = data;
  };

  private onDoubleClick = () => {
    const { data } = this.props;
    const { type, name } = data;

    if (type === 'directory') {
      store.pages.current.location.push(name);
    }
  };

  private onContextMenu = (e: React.MouseEvent) => {
    e.stopPropagation();

    const { data } = this.props;

    if (!data.renaming) {
      store.pages.current.focusFile(data);
      store.contextMenu.show('file');
    }
  };

  private onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      this.rename();
    }

    resizeTextarea(e.target as HTMLTextAreaElement);
  };

  private stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  private selectGroup = () => {
    const { data } = this.props;
    const page = store.pages.current;
    const file = page.files.indexOf(data);
    const focusedFile = page.files.indexOf(page.focusedFile);

    page.selectGroup(file, focusedFile);
  };

  private rename = () => {
    const page = store.pages.current;
    const { data } = this.props;
    page.rename(data, this.inputRef.current.value);
  };

  render() {
    const { data } = this.props;
    const { name, selected, renaming } = data;
    const { icon, opacity } = store.favicons.get(data);

    return (
      <StyledFile
        ref={this.ref}
        onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
        selected={selected}
        onContextMenu={this.onContextMenu}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        disabled={store.dragging.visible && selected}
      >
        <Icon icon={icon} style={{ opacity }} />
        {!renaming && <Label>{name}</Label>}
        <Input
          ref={this.inputRef}
          onKeyDown={this.onInputKey}
          onMouseDown={this.stopPropagation}
          onDoubleClick={this.stopPropagation}
          onBlur={this.rename}
          visible={renaming}
        />
      </StyledFile>
    );
  }
}
