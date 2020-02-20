import styled from 'styled-components';

export const Skeleton = styled.div`
  border-radius: 8px;
  line-height: 1;
  overflow: hidden;
  position: relative;
  background-color: #eceff1;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    left: -100%;
    position: absolute;
    animation: skeleton-animation 1.5s ease-in-out infinite;
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
  }
`;

export const SkeletonCircle = styled(Skeleton)`
  border-radius: 100%;
`;
