import styled from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { icons, transparency } from '~/renderer/constants';

export const StyledFileItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-height: 64px;
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.folder});
  ${centerIcon(48)};
`;

export const Label = styled.div`
  max-width: 100%;
  margin-top: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
